<?php

namespace App\Filament\Resources\Destinations\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
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
                Select::make('city')
                    ->options([
                        'Lombok' => 'Lombok',
                        'Bali' => 'Bali',
                    ])
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
                Select::make('badge')
                    ->label('Badge (opsional)')
                    ->options([
                        '🔥 Viral' => '🔥 Viral',
                        '⭐ Terpopuler' => '⭐ Terpopuler',
                        '🆕 Baru' => '🆕 Baru',
                        '🏆 Best Seller' => '🏆 Best Seller',
                    ])
                    ->placeholder('— Tidak ada badge —')
                    ->helperText('Destinasi dengan badge akan muncul di section "Trip Lagi Viral" di homepage.')
                    ->columnSpanFull(),
                Repeater::make('includes')
                    ->label('Sudah Termasuk (Includes)')
                    ->schema([
                        TextInput::make('item')->label('Item')->required()->placeholder('Guide profesional bersertifikat'),
                    ])
                    ->addActionLabel('+ Tambah Item')
                    ->columnSpanFull(),
                Repeater::make('excludes')
                    ->label('Tidak Termasuk (Excludes)')
                    ->schema([
                        TextInput::make('item')->label('Item')->required()->placeholder('Tiket masuk objek wisata'),
                    ])
                    ->addActionLabel('+ Tambah Item')
                    ->columnSpanFull(),
                Repeater::make('meeting_points')
                    ->label('Meeting Points')
                    ->schema([
                        TextInput::make('name')->label('Nama Titik')->required()->placeholder('Bandara Lombok International'),
                        TextInput::make('address')->label('Alamat / Keterangan')->placeholder('Terminal 1, Area Kedatangan'),
                    ])
                    ->columns(2)
                    ->addActionLabel('+ Tambah Meeting Point')
                    ->columnSpanFull(),
                Repeater::make('highlights')
                    ->label('Highlights')
                    ->schema([
                        TextInput::make('icon')
                            ->label('Icon (emoji)')
                            ->placeholder('⛰️'),
                        TextInput::make('text')
                            ->label('Judul')
                            ->required()
                            ->placeholder('Puncak 3.726 mdpl'),
                        TextInput::make('sub')
                            ->label('Subjudul')
                            ->placeholder('Summit tertinggi di NTB'),
                    ])
                    ->columns(3)
                    ->addActionLabel('+ Tambah Highlight')
                    ->columnSpanFull(),
                Repeater::make('itinerary')
                    ->label('Itinerary')
                    ->schema([
                        TextInput::make('day')
                            ->label('Hari ke-')
                            ->numeric()
                            ->required()
                            ->minValue(1),
                        TextInput::make('title')
                            ->label('Judul Hari')
                            ->required()
                            ->placeholder('Kedatangan & Eksplorasi')
                            ->columnSpanFull(),
                        Repeater::make('items')
                            ->label('Aktivitas')
                            ->schema([
                                TextInput::make('time')
                                    ->label('Waktu')
                                    ->placeholder('08.00'),
                                TextInput::make('act')
                                    ->label('Aktivitas')
                                    ->required()
                                    ->placeholder('Kumpul di meeting point'),
                            ])
                            ->columns(2)
                            ->addActionLabel('+ Tambah Aktivitas')
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->addActionLabel('+ Tambah Hari')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('destinations')
                    ->visibility('public')
                    ->maxSize(2048),
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
