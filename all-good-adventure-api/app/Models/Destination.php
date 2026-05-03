<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Destination extends Model
{
    protected $fillable = [
        'trip_type_id',
        'category_id',
        'name',
        'slug',
        'city',
        'price',
        'duration_days',
        'duration_nights',
        'description',
        'tags',
        'badge',
        'includes',
        'excludes',
        'meeting_points',
        'highlights',
        'itinerary',
        'image',
        'status',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'duration_days' => 'integer',
            'duration_nights' => 'integer',
            'tags' => 'array',
            'includes' => 'array',
            'excludes' => 'array',
            'meeting_points' => 'array',
            'highlights' => 'array',
            'itinerary' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function tripType(): BelongsTo
    {
        return $this->belongsTo(TripType::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function bookingDestinations(): HasMany
    {
        return $this->hasMany(BookingDestination::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
