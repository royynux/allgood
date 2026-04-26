<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Support\Carbon;

class TodaysDeparturesTable extends TableWidget
{
    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->heading('Today\'s Departures')
            ->query(
                Booking::query()
                    ->with(['tripType', 'destination', 'guide'])
                    ->whereDate('start_date', Carbon::today())
                    ->latest('start_date')
            )
            ->columns([
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
                TextColumn::make('meeting_point')
                    ->limit(32),
                TextColumn::make('status')
                    ->badge(),
            ])
            ->recordActions([
                ViewAction::make(),
            ]);
    }
}
