<?php

namespace App\Filament\Resources\Guides\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class GuideForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('location'),
                Select::make('specialty')
                    ->options([
                        'mountain' => 'Mountain',
                        'beach' => 'Beach',
                        'culture' => 'Culture',
                        'island' => 'Island Hopping',
                    ]),
                TextInput::make('specialty_label'),
                Textarea::make('bio')
                    ->columnSpanFull(),
                FileUpload::make('avatar')
                    ->image(),
                FileUpload::make('cover_image')
                    ->image(),
                TextInput::make('rating')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('review_count')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('trips_done')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('years_experience')
                    ->label('Tahun Pengalaman')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('age')
                    ->label('Umur')
                    ->numeric()
                    ->minValue(17)
                    ->maxValue(100)
                    ->suffix('tahun'),
                TextInput::make('languages'),
                TagsInput::make('destinations')
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
