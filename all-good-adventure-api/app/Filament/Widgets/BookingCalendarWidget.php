<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Widgets\Widget;
use Illuminate\Support\Carbon;

class BookingCalendarWidget extends Widget
{
    protected static bool $isDiscovered = false;

    protected static ?int $sort = 7;

    protected string $view = 'filament.widgets.booking-calendar-widget';

    protected int|string|array $columnSpan = 'full';

    protected function getViewData(): array
    {
        $month = Carbon::now()->startOfMonth();
        $start = $month->copy()->startOfWeek();
        $end = $month->copy()->endOfMonth()->endOfWeek();

        $bookings = Booking::query()
            ->with(['tripType', 'destination'])
            ->whereBetween('start_date', [$start, $end])
            ->orderBy('start_date')
            ->get()
            ->groupBy(fn (Booking $booking) => $booking->start_date->toDateString());

        $weeks = [];
        $cursor = $start->copy();

        while ($cursor <= $end) {
            $week = [];

            for ($i = 0; $i < 7; $i++) {
                $date = $cursor->copy();
                $week[] = [
                    'date' => $date,
                    'isCurrentMonth' => $date->isSameMonth($month),
                    'isToday' => $date->isToday(),
                    'bookings' => $bookings->get($date->toDateString(), collect()),
                ];
                $cursor->addDay();
            }

            $weeks[] = $week;
        }

        return [
            'monthLabel' => $month->format('F Y'),
            'weeks' => $weeks,
        ];
    }
}
