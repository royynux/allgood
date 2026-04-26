<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'booking_code' => $this->booking_code,
            'status' => $this->status,
            'start_date' => $this->start_date?->toDateString(),
            'end_date' => $this->end_date?->toDateString(),
            'duration_days' => $this->duration_days,
            'participants_count' => $this->participants_count,
            'participant_names' => $this->participants->pluck('name')->values(),
            'meeting_point' => $this->meeting_point,
            'customer_name' => $this->customer_name,
            'customer_phone' => $this->customer_phone,
            'customer_email' => $this->customer_email,
            'notes' => $this->notes,
            'estimated_total' => $this->estimated_total,
            'confirmed_total' => $this->confirmed_total,
            'trip_type' => [
                'id' => $this->tripType?->id,
                'name' => $this->tripType?->name,
                'slug' => $this->tripType?->slug,
            ],
            'destination' => $this->destination ? new DestinationResource($this->destination) : null,
            'custom_destinations' => DestinationResource::collection(
                $this->bookingDestinations->pluck('destination')->filter()->values()
            ),
            'guide' => $this->guide ? new GuideResource($this->guide) : null,
        ];
    }
}
