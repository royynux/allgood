<?php

namespace App\Filament\Resources\Destinations\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class DestinationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('trip_type_id')
                    ->relationship('tripType', 'name')
                    ->required(),
                Select::make('category_id')
                    ->relationship('category', 'name'),
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('city')
                    ->required()
                    ->default('Lombok'),
                TextInput::make('price')
                    ->label('Price per person')
                    ->required()
                    ->numeric()
                    ->default(0)
                    ->prefix('Rp'),
                TextInput::make('duration_days')
                    ->required()
                    ->numeric()
                    ->default(1),
                TextInput::make('duration_nights')
                    ->required()
                    ->numeric()
                    ->default(0),
                Textarea::make('description')
                    ->columnSpanFull(),
                TagsInput::make('tags')
                    ->columnSpanFull(),
                Textarea::make('highlights')
                    ->formatStateUsing(fn ($state) => is_array($state) ? json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) : $state)
                    ->dehydrateStateUsing(fn ($state) => blank($state) ? null : json_decode($state, true))
                    ->helperText('JSON data for frontend highlight cards.')
                    ->columnSpanFull(),
                Textarea::make('itinerary')
                    ->formatStateUsing(fn ($state) => is_array($state) ? json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) : $state)
                    ->dehydrateStateUsing(fn ($state) => blank($state) ? null : json_decode($state, true))
                    ->helperText('JSON data for frontend itinerary.')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image(),
                Select::make('status')
                    ->options([
                        'available' => 'Available',
                        'unavailable' => 'Unavailable',
                    ])
                    ->required()
                    ->default('available'),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
