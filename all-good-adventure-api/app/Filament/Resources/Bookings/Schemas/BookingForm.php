<?php

namespace App\Filament\Resources\Bookings\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BookingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name'),
                Select::make('trip_type_id')
                    ->relationship('tripType', 'name')
                    ->required(),
                Select::make('destination_id')
                    ->relationship('destination', 'name'),
                Select::make('guide_id')
                    ->relationship('guide', 'name')
                    ->required(),
                TextInput::make('booking_code')
                    ->required(),
                DatePicker::make('start_date')
                    ->required(),
                DatePicker::make('end_date'),
                TextInput::make('duration_days')
                    ->required()
                    ->numeric()
                    ->default(1),
                TextInput::make('participants_count')
                    ->required()
                    ->numeric()
                    ->default(1),
                TextInput::make('meeting_point'),
                TextInput::make('customer_name')
                    ->required(),
                TextInput::make('customer_phone')
                    ->tel()
                    ->required(),
                TextInput::make('customer_email')
                    ->email()
                    ->required(),
                Textarea::make('notes')
                    ->columnSpanFull(),
                Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'cancelled' => 'Cancelled',
                        'completed' => 'Completed',
                    ])
                    ->required()
                    ->default('pending'),
                TextInput::make('estimated_total')
                    ->numeric()
                    ->prefix('Rp'),
                TextInput::make('confirmed_total')
                    ->numeric()
                    ->prefix('Rp'),
                Textarea::make('admin_notes')
                    ->columnSpanFull(),
            ]);
    }
}
