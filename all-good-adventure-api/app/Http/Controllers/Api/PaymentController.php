<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Midtrans\Config as MidtransConfig;
use Midtrans\Notification;
use Midtrans\Snap;
use Midtrans\Transaction;

class PaymentController extends Controller
{
    public function snapToken(Request $request)
    {
        $validated = $request->validate([
            'booking_code' => ['required', 'string', 'exists:bookings,booking_code'],
        ]);

        $booking = Booking::where('booking_code', $validated['booking_code'])
            ->with('destination')
            ->firstOrFail();

        if (! $booking->estimated_total) {
            return response()->json([
                'message' => 'Harga trip belum dikonfirmasi. Admin akan menghubungimu.',
            ], 422);
        }

        $this->configureMidtrans();

        $orderId = $booking->booking_code . '-' . now()->timestamp;
        $grossAmount = (int) $booking->estimated_total;
        $itemName = substr(($booking->destination?->name ?? 'Private Trip') . ' - ' . $booking->participants_count . ' pax', 0, 50);

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $grossAmount,
            ],
            'customer_details' => [
                'first_name' => $booking->customer_name,
                'email' => $booking->customer_email,
                'phone' => $booking->customer_phone,
            ],
            'item_details' => [
                [
                    'id' => 'TRIP-' . $booking->booking_code,
                    'price' => $grossAmount,
                    'quantity' => 1,
                    'name' => $itemName,
                ],
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        Payment::create([
            'booking_id' => $booking->id,
            'order_id' => $orderId,
            'snap_token' => $snapToken,
            'gross_amount' => $grossAmount,
            'transaction_status' => 'pending',
        ]);

        return response()->json([
            'snap_token' => $snapToken,
            'order_id' => $orderId,
        ]);
    }

    public function confirm(Request $request)
    {
        $validated = $request->validate([
            'booking_code' => ['required', 'string', 'exists:bookings,booking_code'],
        ]);

        $booking = Booking::where('booking_code', $validated['booking_code'])
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $payment = Payment::where('booking_id', $booking->id)->latest()->first();

        if ($payment) {
            $this->configureMidtrans();
            try {
                $status = Transaction::status($payment->order_id);
                $txStatus  = $status->transaction_status ?? null;
                $fraudStatus = $status->fraud_status ?? null;

                $isPaid = $txStatus === 'settlement' ||
                          ($txStatus === 'capture' && $fraudStatus === 'accept');

                if ($isPaid) {
                    $payment->update([
                        'transaction_status' => $txStatus,
                        'fraud_status' => $fraudStatus,
                        'paid_at' => now(),
                    ]);
                    $booking->update(['status' => 'confirmed']);
                }
            } catch (\Exception $e) {
                Log::warning('Payment confirm check failed: ' . $e->getMessage());
            }
        }

        return response()->json(['booking_status' => $booking->fresh()->status]);
    }

    public function notification(Request $request)
    {
        $this->configureMidtrans();

        try {
            $notif = new Notification();
        } catch (\Exception $e) {
            Log::error('Midtrans notification error: ' . $e->getMessage());
            return response()->json(['status' => 'error'], 400);
        }

        $payment = Payment::where('order_id', $notif->order_id)->first();

        if (! $payment) {
            Log::warning('Midtrans notification: unknown order_id ' . $notif->order_id);
            return response()->json(['status' => 'ok']);
        }

        $status = $notif->transaction_status;
        $fraud = $notif->fraud_status ?? null;

        $payment->update([
            'transaction_status' => $status,
            'payment_type' => $notif->payment_type ?? null,
            'fraud_status' => $fraud,
            'midtrans_response' => $request->all(),
        ]);

        $isPaid = ($status === 'settlement') ||
                  ($status === 'capture' && $fraud === 'accept');

        if ($isPaid) {
            $payment->update(['paid_at' => now()]);
            $payment->booking()->update(['status' => 'confirmed']);
        }

        return response()->json(['status' => 'ok']);
    }

    private function configureMidtrans(): void
    {
        MidtransConfig::$serverKey = config('midtrans.server_key');
        MidtransConfig::$isProduction = config('midtrans.is_production');
        MidtransConfig::$isSanitized = true;
        MidtransConfig::$is3ds = true;

        $caBundle = env('CURL_CA_BUNDLE', '');
        if ($caBundle && file_exists($caBundle)) {
            ini_set('curl.cainfo', $caBundle);
        }
    }
}
