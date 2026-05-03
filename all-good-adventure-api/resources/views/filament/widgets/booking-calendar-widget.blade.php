<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">
            Booking Calendar
        </x-slot>

        <x-slot name="description">
            Trips by start date for {{ $monthLabel }}
        </x-slot>

        <div class="overflow-x-auto">
            <div class="grid min-w-[760px] grid-cols-7 gap-px overflow-hidden rounded-xl border border-gray-200/70 bg-gray-200/70 dark:border-white/[0.07] dark:bg-white/[0.07]">
                @foreach (['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as $day)
                    <div class="bg-gray-50/90 px-3 py-2.5 text-[0.68rem] font-bold uppercase tracking-widest text-gray-400 dark:bg-white/[0.04] dark:text-gray-500">
                        {{ $day }}
                    </div>
                @endforeach

                @foreach ($weeks as $week)
                    @foreach ($week as $cell)
                        <div @class([
                            'min-h-28 bg-white p-2.5 dark:bg-gray-900/80',
                            'opacity-40' => ! $cell['isCurrentMonth'],
                            'ring-2 ring-primary-500/80 ring-inset bg-primary-50/20 dark:bg-primary-950/20' => $cell['isToday'],
                        ])>
                            <div @class([
                                'mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                                'bg-primary-500 text-white shadow-sm shadow-primary-500/40' => $cell['isToday'],
                                'text-gray-600 dark:text-gray-300' => ! $cell['isToday'],
                            ])>
                                {{ $cell['date']->format('j') }}
                            </div>

                            <div class="space-y-1">
                                @foreach ($cell['bookings']->take(3) as $booking)
                                    <div class="rounded-md bg-primary-50 px-2 py-1 text-xs text-primary-700 ring-1 ring-primary-100 dark:bg-primary-500/[0.12] dark:text-primary-300 dark:ring-primary-500/20">
                                        <div class="truncate font-semibold leading-tight">{{ $booking->booking_code }}</div>
                                        <div class="truncate text-primary-500/80 dark:text-primary-400/70">{{ $booking->destination?->name ?? 'Custom Trip' }}</div>
                                    </div>
                                @endforeach

                                @if ($cell['bookings']->count() > 3)
                                    <div class="rounded px-1.5 py-0.5 text-[0.7rem] font-semibold text-gray-400 dark:text-gray-500">
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
