<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'trip_type_id',
        'destination_id',
        'guide_id',
        'booking_code',
        'start_date',
        'end_date',
        'duration_days',
        'participants_count',
        'meeting_point',
        'customer_name',
        'customer_phone',
        'customer_email',
        'notes',
        'status',
        'estimated_total',
        'confirmed_total',
        'admin_notes',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'duration_days' => 'integer',
            'participants_count' => 'integer',
            'estimated_total' => 'integer',
            'confirmed_total' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tripType(): BelongsTo
    {
        return $this->belongsTo(TripType::class);
    }

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    public function guide(): BelongsTo
    {
        return $this->belongsTo(Guide::class);
    }

    public function participants(): HasMany
    {
        return $this->hasMany(BookingParticipant::class);
    }

    public function bookingDestinations(): HasMany
    {
        return $this->hasMany(BookingDestination::class);
    }
}
