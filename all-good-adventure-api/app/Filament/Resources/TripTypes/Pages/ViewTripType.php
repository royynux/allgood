<?php

namespace App\Filament\Resources\TripTypes\Pages;

use App\Filament\Resources\TripTypes\TripTypeResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTripType extends ViewRecord
{
    protected static string $resource = TripTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
