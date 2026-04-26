<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Support\Carbon;

class UpcomingTripsTable extends TableWidget
{
    protected static ?int $sort = 3;

    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        $today = Carbon::today();

        return $table
            ->heading('Upcoming Trips')
            ->description('Trips starting in the next 14 days')
            ->query(
                Booking::query()
                    ->with(['tripType', 'destination', 'guide'])
                    ->whereBetween('start_date', [$today, $today->copy()->addDays(14)])
                    ->orderBy('start_date')
            )
            ->columns([
                TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                TextColumn::make('booking_code')
                    ->searchable(),
                TextColumn::make('customer_name')
                    ->searchable(),
                TextColumn::make('tripType.name')
                    ->label('Trip Type'),
                TextColumn::make('destination.name')
                    ->placeholder('Custom Trip'),
                TextColumn::make('guide.name'),
                TextColumn::make('participants_count')
                    ->label('Participants'),
                TextColumn::make('status')
                    ->badge(),
            ])
            ->recordActions([
                ViewAction::make(),
            ]);
    }
}
