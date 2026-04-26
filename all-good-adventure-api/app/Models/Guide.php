<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Guide extends Model
{
    protected $fillable = [
        'name',
        'location',
        'specialty',
        'specialty_label',
        'bio',
        'avatar',
        'cover_image',
        'rating',
        'review_count',
        'trips_done',
        'years_experience',
        'languages',
        'destinations',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:1',
            'review_count' => 'integer',
            'trips_done' => 'integer',
            'years_experience' => 'integer',
            'destinations' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function certifications(): HasMany
    {
        return $this->hasMany(GuideCertification::class);
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(GuideAvailability::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
