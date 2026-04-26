<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Widgets\ChartWidget;

class TripTypeBreakdownChart extends ChartWidget
{
    protected static ?int $sort = 6;

    protected ?string $heading = 'Trip Type Breakdown';

    protected ?string $description = 'One Day vs Rinjani vs Custom';

    protected int|string|array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getData(): array
    {
        $rows = Booking::query()
            ->join('trip_types', 'bookings.trip_type_id', '=', 'trip_types.id')
            ->selectRaw('trip_types.name as name, COUNT(*) as total')
            ->groupBy('trip_types.name')
            ->orderBy('trip_types.name')
            ->get();

        return [
            'datasets' => [[
                'label' => 'Bookings',
                'data' => $rows->pluck('total')->all(),
                'backgroundColor' => '#E8490F',
            ]],
            'labels' => $rows->pluck('name')->all(),
        ];
    }
}
