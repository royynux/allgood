<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Carbon;

class OperationsStatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected ?string $heading = 'Operations Overview';

    protected function getStats(): array
    {
        $today = Carbon::today();
        $monthStart = Carbon::now()->startOfMonth();
        $monthEnd = Carbon::now()->endOfMonth();

        $thisMonth = Booking::query()
            ->whereBetween('start_date', [$monthStart, $monthEnd]);

        $bookingCountThisMonth = (clone $thisMonth)->count();
        $participantsThisMonth = (clone $thisMonth)->sum('participants_count');

        return [
            Stat::make('Today\'s Departures', Booking::whereDate('start_date', $today)->count())
                ->description('Bookings starting today')
                ->icon(Heroicon::OutlinedCalendarDays)
                ->color('primary'),

            Stat::make('Upcoming Trips', Booking::whereBetween('start_date', [$today, $today->copy()->addDays(14)])->count())
                ->description('Next 14 days')
                ->icon(Heroicon::OutlinedClock)
                ->color('info'),

            Stat::make('Pending Confirmation', Booking::where('status', 'pending')->count())
                ->description('Needs admin follow-up')
                ->icon(Heroicon::OutlinedExclamationTriangle)
                ->color('warning'),

            Stat::make('Custom Pricing Queue', Booking::whereHas('tripType', fn ($query) => $query->where('slug', 'custom'))
                ->whereNull('confirmed_total')
                ->count())
                ->description('Custom trips without confirmed total')
                ->icon(Heroicon::OutlinedBanknotes)
                ->color('danger'),

            Stat::make('Participants This Month', $participantsThisMonth)
                ->description('Total participants')
                ->icon(Heroicon::OutlinedUsers)
                ->color('success'),

            Stat::make('Average Participants', $bookingCountThisMonth > 0 ? round($participantsThisMonth / $bookingCountThisMonth, 1) : 0)
                ->description('Per booking this month')
                ->icon(Heroicon::OutlinedChartBar)
                ->color('gray'),
        ];
    }
}
