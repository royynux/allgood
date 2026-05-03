<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\DestinationResource;
use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index(Request $request)
    {
        $destinations = Destination::query()
            ->with(['tripType', 'category'])
            ->where('is_active', true)
            ->when($request->query('trip_type'), fn ($query, $tripType) => $query->whereHas(
                'tripType',
                fn ($tripTypeQuery) => $tripTypeQuery->where('slug', $tripType),
            ))
            ->when($request->query('category'), fn ($query, $category) => $query->whereHas(
                'category',
                fn ($categoryQuery) => $categoryQuery->where('slug', $category),
            ))
            ->when($request->query('city'), fn ($query, $city) => $query->where('city', $city))
            ->when($request->query('price_min'), fn ($query, $min) => $query->where('price', '>=', (int) $min))
            ->when($request->query('price_max'), fn ($query, $max) => $query->where('price', '<=', (int) $max))
            ->when($request->boolean('featured'), fn ($query) => $query->whereNotNull('badge'))
            ->when($request->query('search'), fn ($query, $search) => $query->where(
                fn ($searchQuery) => $searchQuery
                    ->where('name', 'ilike', "%{$search}%")
                    ->orWhere('city', 'ilike', "%{$search}%")
                    ->orWhere('description', 'ilike', "%{$search}%"),
            ))
            ->orderBy('city')
            ->orderBy('name')
            ->get();

        return DestinationResource::collection($destinations);
    }

    public function show(Destination $destination): DestinationResource
    {
        abort_unless($destination->is_active, 404);

        return new DestinationResource($destination->load(['tripType', 'category']));
    }
}
