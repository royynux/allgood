<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\GuideResource;
use App\Models\Guide;
use Illuminate\Http\Request;

class GuideController extends Controller
{
    public function index(Request $request)
    {
        $guides = Guide::query()
            ->with(['certifications', 'availabilities'])
            ->where('is_active', true)
            ->when($request->query('specialty'), fn ($query, $specialty) => $query->where('specialty', $specialty))
            ->when($request->query('search'), fn ($query, $search) => $query->where(
                fn ($searchQuery) => $searchQuery
                    ->where('name', 'ilike', "%{$search}%")
                    ->orWhere('specialty_label', 'ilike', "%{$search}%")
                    ->orWhere('location', 'ilike', "%{$search}%"),
            ))
            ->orderByDesc('rating')
            ->orderBy('name')
            ->get();

        return GuideResource::collection($guides);
    }

    public function show(Guide $guide): GuideResource
    {
        abort_unless($guide->is_active, 404);

        return new GuideResource($guide->load(['certifications', 'availabilities']));
    }
}
