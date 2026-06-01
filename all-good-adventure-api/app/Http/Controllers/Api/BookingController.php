<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\BookingResource;
use App\Models\Booking;
use App\Models\Destination;
use App\Models\TripType;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = $request->user()
            ->bookings()
            ->with(['tripType', 'destination', 'guide'])
            ->latest()
            ->get();

        return response()->json([
            'data' => $bookings->map(fn ($b) => [
                'id'               => $b->id,
                'booking_code'     => $b->booking_code,
                'status'           => $b->status,
                'trip_type'        => $b->tripType?->only(['id', 'name', 'slug']),
                'destination'      => $b->destination ? ['name' => $b->destination->name] : null,
                'guide'            => $b->guide ? ['name' => $b->guide->name] : null,
                'start_date'       => $b->start_date?->format('Y-m-d'),
                'end_date'         => $b->end_date?->format('Y-m-d'),
                'duration_days'    => $b->duration_days,
                'participants_count' => $b->participants_count,
                'customer_name'    => $b->customer_name,
                'estimated_total'  => $b->estimated_total,
                'confirmed_total'  => $b->confirmed_total,
                'created_at'       => $b->created_at->format('Y-m-d H:i:s'),
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'trip_type' => ['required', Rule::in(['one-day', 'custom'])],
            'destination_id' => ['nullable', 'integer', 'exists:destinations,id'],
            'destination_ids' => ['nullable', 'array'],
            'destination_ids.*' => ['integer', 'exists:destinations,id'],
            'guide_id' => ['required', 'integer', 'exists:guides,id'],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'duration_days' => ['nullable', 'integer', 'min:1', 'max:14'],
            'participants_count' => ['required', 'integer', 'min:1', 'max:50'],
            'participant_names' => ['required', 'array'],
            'participant_names.*' => ['required', 'string', 'max:255'],
            'meeting_point' => ['nullable', 'string', 'max:255'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:50'],
            'customer_email' => ['required', 'email', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        if (count($validated['participant_names']) !== (int) $validated['participants_count']) {
            throw ValidationException::withMessages([
                'participant_names' => 'Jumlah nama peserta harus sama dengan jumlah peserta.',
            ]);
        }

        $tripType = TripType::where('slug', $validated['trip_type'])->firstOrFail();
        $startDate = Carbon::parse($validated['start_date'])->startOfDay();

        [$destination, $customDestinationIds, $endDate, $durationDays, $estimatedTotal] = $this->resolveBookingDetails(
            $validated,
            $startDate,
        );

        $userId = $request->user()->id;

        $booking = DB::transaction(function () use (
            $validated,
            $tripType,
            $destination,
            $customDestinationIds,
            $startDate,
            $endDate,
            $durationDays,
            $estimatedTotal,
            $userId,
        ) {
            $booking = Booking::create([
                'user_id' => $userId,
                'trip_type_id' => $tripType->id,
                'destination_id' => $destination?->id,
                'guide_id' => $validated['guide_id'],
                'booking_code' => $this->makeBookingCode(),
                'start_date' => $startDate,
                'end_date' => $endDate,
                'duration_days' => $durationDays,
                'participants_count' => $validated['participants_count'],
                'meeting_point' => $validated['meeting_point'] ?? null,
                'customer_name' => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'],
                'customer_email' => $validated['customer_email'],
                'notes' => $validated['notes'] ?? null,
                'status' => 'pending',
                'estimated_total' => $estimatedTotal,
            ]);

            foreach ($validated['participant_names'] as $name) {
                $booking->participants()->create(['name' => $name]);
            }

            foreach ($customDestinationIds as $destinationId) {
                $booking->bookingDestinations()->create(['destination_id' => $destinationId]);
            }

            return $booking;
        });

        return (new BookingResource($booking->load([
            'tripType',
            'destination.tripType',
            'destination.category',
            'guide.certifications',
            'guide.availabilities',
            'participants',
            'bookingDestinations.destination.tripType',
            'bookingDestinations.destination.category',
        ])))->response()->setStatusCode(201);
    }

    private function resolveBookingDetails(array $validated, Carbon $startDate): array
    {
        if ($validated['trip_type'] === 'custom') {
            $destinationIds = array_values(array_unique($validated['destination_ids'] ?? []));

            if ($destinationIds === []) {
                throw ValidationException::withMessages([
                    'destination_ids' => 'Custom trip membutuhkan minimal satu destinasi.',
                ]);
            }

            $durationDays = (int) ($validated['duration_days'] ?? 0);

            if ($durationDays < 1) {
                throw ValidationException::withMessages([
                    'duration_days' => 'Custom trip membutuhkan durasi perkiraan.',
                ]);
            }

            return [null, $destinationIds, null, $durationDays, null];
        }

        $destination = Destination::whereKey($validated['destination_id'] ?? null)
            ->whereHas('tripType', fn ($query) => $query->where('slug', 'one-day'))
            ->first();

        if (! $destination) {
            throw ValidationException::withMessages([
                'destination_id' => 'One Day Trip membutuhkan satu destinasi one-day yang valid.',
            ]);
        }

        return [$destination, [], $startDate, 1, $destination->price * $validated['participants_count']];
    }

    private function makeBookingCode(): string
    {
        do {
            $code = 'AGA-' . now()->format('Ymd') . '-' . Str::upper(Str::random(6));
        } while (Booking::where('booking_code', $code)->exists());

        return $code;
    }
}
