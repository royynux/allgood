<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Widgets\ChartWidget;

class TopCitiesChart extends ChartWidget
{
    protected static ?int $sort = 5;

    protected ?string $heading = 'Top Cities';

    protected ?string $description = 'Booking count by destination city';

    protected int|string|array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getData(): array
    {
        $rows = Booking::query()
            ->leftJoin('destinations', 'bookings.destination_id', '=', 'destinations.id')
            ->selectRaw("COALESCE(destinations.city, 'Custom Trip') as city, COUNT(*) as total")
            ->groupBy('city')
            ->orderByDesc('total')
            ->get();

        return [
            'datasets' => [[
                'label' => 'Bookings',
                'data' => $rows->pluck('total')->all(),
                'backgroundColor' => ['#E8490F', '#2563EB', '#059669', '#D97706', '#7C3AED'],
            ]],
            'labels' => $rows->pluck('city')->all(),
        ];
    }
}
