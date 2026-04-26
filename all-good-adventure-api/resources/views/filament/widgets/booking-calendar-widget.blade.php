<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">
            Booking Calendar
        </x-slot>

        <x-slot name="description">
            Trips by start date for {{ $monthLabel }}
        </x-slot>

        <div class="overflow-x-auto">
            <div class="grid min-w-[760px] grid-cols-7 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 dark:border-white/10 dark:bg-white/10">
                @foreach (['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as $day)
                    <div class="bg-gray-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:bg-white/5 dark:text-gray-400">
                        {{ $day }}
                    </div>
                @endforeach

                @foreach ($weeks as $week)
                    @foreach ($week as $cell)
                        <div @class([
                            'min-h-28 bg-white p-2 dark:bg-gray-900',
                            'opacity-45' => ! $cell['isCurrentMonth'],
                            'ring-2 ring-primary-500 ring-inset' => $cell['isToday'],
                        ])>
                            <div class="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-200">
                                {{ $cell['date']->format('j') }}
                            </div>

                            <div class="space-y-1">
                                @foreach ($cell['bookings']->take(3) as $booking)
                                    <div class="rounded-md bg-primary-50 px-2 py-1 text-xs text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
                                        <div class="truncate font-semibold">{{ $booking->booking_code }}</div>
                                        <div class="truncate">{{ $booking->destination?->name ?? 'Custom Trip' }}</div>
                                    </div>
                                @endforeach

                                @if ($cell['bookings']->count() > 3)
                                    <div class="text-xs text-gray-500 dark:text-gray-400">
                                        +{{ $cell['bookings']->count() - 3 }} more
                                    </div>
                                @endif
                            </div>
                        </div>
                    @endforeach
                @endforeach
            </div>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
