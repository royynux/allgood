<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reviewer_name' => $this->reviewer_name,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'trip_date' => $this->trip_date?->format('Y-m-d'),
            'created_at' => $this->created_at->format('Y-m-d'),
        ];
    }
}
