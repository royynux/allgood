<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class DestinationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'city' => $this->city,
            'price' => $this->price,
            'duration_days' => $this->duration_days,
            'duration_nights' => $this->duration_nights,
            'description' => $this->description,
            'tags' => $this->tags ?? [],
            'badge' => $this->badge,
            'includes' => $this->includes ?? [],
            'excludes' => $this->excludes ?? [],
            'meeting_points' => $this->meeting_points ?? [],
            'highlights' => $this->highlights ?? [],
            'itinerary' => $this->itinerary ?? [],
            'image' => $this->image
                ? (str_starts_with($this->image, 'http') ? $this->image : url(Storage::url($this->image)))
                : null,
            'status' => $this->status,
            'is_active' => $this->is_active,
            'trip_type' => [
                'id' => $this->tripType?->id,
                'name' => $this->tripType?->name,
                'slug' => $this->tripType?->slug,
            ],
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
                'slug' => $this->category?->slug,
            ],
        ];
    }
}
