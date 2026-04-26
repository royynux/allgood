<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;

class CustomTripPricingQueueTable extends TableWidget
{
    protected static ?int $sort = 4;

    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->heading('Custom Trip Pricing Queue')
            ->description('Custom trip bookings that still need confirmed pricing')
            ->query(
                Booking::query()
                    ->with(['tripType', 'guide', 'bookingDestinations.destination'])
                    ->whereHas('tripType', fn ($query) => $query->where('slug', 'custom'))
                    ->whereNull('confirmed_total')
                    ->latest()
            )
            ->columns([
                TextColumn::make('booking_code')
                    ->searchable(),
                TextColumn::make('customer_name')
                    ->searchable(),
                TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                TextColumn::make('duration_days')
                    ->label('Days'),
                TextColumn::make('participants_count')
                    ->label('Participants'),
                TextColumn::make('guide.name'),
                TextColumn::make('status')
                    ->badge(),
                TextColumn::make('created_at')
                    ->since(),
            ])
            ->recordActions([
                EditAction::make(),
            ]);
    }
}
