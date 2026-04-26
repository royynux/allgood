<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuideResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'location' => $this->location,
            'specialty' => $this->specialty,
            'specialty_label' => $this->specialty_label,
            'bio' => $this->bio,
            'avatar' => $this->avatar,
            'cover_image' => $this->cover_image,
            'rating' => (float) $this->rating,
            'review_count' => (int) $this->review_count,
            'trips_done' => (int) $this->trips_done,
            'years_experience' => (int) $this->years_experience,
            'languages' => $this->languages ?? [],
            'destinations' => $this->destinations ?? [],
            'is_active' => $this->is_active,
            'certifications' => $this->certifications->map(fn ($c) => [
                'id' => $c->id,
                'certification_name' => $c->name,
                'issued_date' => null,
            ])->values(),
            'availabilities' => $this->availabilities->map(fn ($a) => [
                'id' => $a->id,
                'day_of_week' => $a->day,
                'available_from' => $a->start_time?->format('H:i'),
                'available_to' => $a->end_time?->format('H:i'),
            ])->values(),
        ];
    }
}
