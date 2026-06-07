<?php

namespace App\Filament\Resources\TestimonialResource\Pages;

use App\Filament\Resources\TestimonialResource;
use App\Models\Testimonial;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTestimonials extends ListRecords
{
    protected static string $resource = TestimonialResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->visible(fn (): bool => Testimonial::count() < TestimonialResource::MAX_TESTIMONIALS)
                ->disabled(fn (): bool => Testimonial::count() >= TestimonialResource::MAX_TESTIMONIALS),
        ];
    }
}
