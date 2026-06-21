<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'avatar' => $this->avatar
                ? (str_starts_with($this->avatar, 'http') ? $this->avatar : url(Storage::url($this->avatar)))
                : null,
            'cover_image' => $this->cover_image
                ? (str_starts_with($this->cover_image, 'http') ? $this->cover_image : url(Storage::url($this->cover_image)))
                : null,
            'rating' => (float) $this->rating,
            'review_count' => (int) $this->review_count,
            'trips_done' => (int) $this->trips_done,
            'years_experience' => (int) $this->years_experience,
            'age' => $this->age !== null ? (int) $this->age : null,
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
