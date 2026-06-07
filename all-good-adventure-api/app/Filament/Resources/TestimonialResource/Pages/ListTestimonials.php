<?php

namespace App\Filament\Resources\TestimonialResource\Pages;

use App\Filament\Resources\TestimonialResource;
use App\Models\Testimonial;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Schema;

class ListTestimonials extends ListRecords
{
    protected static string $resource = TestimonialResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->mountUsing(function (Actions\CreateAction $action, ?Schema $schema) {
                    if (Testimonial::count() >= TestimonialResource::MAX_TESTIMONIALS) {
                        Notification::make()
                            ->title('Batas maksimal tercapai')
                            ->body('Maksimal hanya '.TestimonialResource::MAX_TESTIMONIALS.' testimoni yang dapat ditampilkan di halaman utama. Silakan edit atau hapus salah satu testimoni yang sudah ada terlebih dahulu.')
                            ->warning()
                            ->send();

                        $action->halt();

                        return;
                    }

                    $schema?->fill();
                }),
        ];
    }
}
