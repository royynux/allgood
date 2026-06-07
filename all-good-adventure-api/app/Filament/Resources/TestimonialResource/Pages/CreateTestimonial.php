<?php

namespace App\Filament\Resources\TestimonialResource\Pages;

use App\Filament\Resources\TestimonialResource;
use App\Models\Testimonial;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Filament\Support\Exceptions\Halt;

class CreateTestimonial extends CreateRecord
{
    protected static string $resource = TestimonialResource::class;

    protected function beforeCreate(): void
    {
        if (Testimonial::count() >= TestimonialResource::MAX_TESTIMONIALS) {
            Notification::make()
                ->title('Batas maksimal tercapai')
                ->body('Maksimal hanya '.TestimonialResource::MAX_TESTIMONIALS.' testimoni yang dapat ditampilkan. Silakan edit atau hapus salah satu testimoni yang ada terlebih dahulu.')
                ->danger()
                ->send();

            $this->halt();
        }
    }
}
