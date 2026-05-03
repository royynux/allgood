<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\ReviewResource;
use App\Models\Destination;

class ReviewController extends Controller
{
    public function index(Destination $destination)
    {
        abort_unless($destination->is_active, 404);

        $reviews = $destination->reviews()
            ->where('is_published', true)
            ->latest()
            ->get();

        return ReviewResource::collection($reviews);
    }
}
