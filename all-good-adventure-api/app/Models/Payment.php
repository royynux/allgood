<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'booking_id',
        'order_id',
        'snap_token',
        'payment_type',
        'transaction_status',
        'fraud_status',
        'gross_amount',
        'midtrans_response',
        'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'midtrans_response' => 'array',
            'paid_at' => 'datetime',
            'gross_amount' => 'integer',
        ];
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}
