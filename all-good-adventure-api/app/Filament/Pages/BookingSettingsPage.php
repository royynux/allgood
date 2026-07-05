<?php

namespace App\Filament\Pages;

use App\Models\SiteSetting;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class BookingSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-shopping-bag';

    protected string $view = 'filament.pages.site-settings-page';

    protected static ?string $navigationLabel = 'Pengaturan Booking';

    protected static ?string $title = 'Pengaturan Halaman Booking';

    protected static \UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 5;

    public ?array $data = [];

    public function mount(): void
    {
        $booking = json_decode(SiteSetting::get('booking_settings', '{}'), true) ?? [];

        $this->form->fill([
            'custom_cta_title'       => $booking['custom_cta_title'] ?? 'Harga Dikonfirmasi Admin',
            'custom_cta_description' => $booking['custom_cta_description'] ?? 'Tim kami akan menghubungimu dalam 1×24 jam dengan penawaran terbaik.',
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('💬 Custom Trip — Teks Konfirmasi Harga')
                    ->description('Teks yang muncul di ringkasan booking Custom Trip, menggantikan total harga.')
                    ->schema([
                        TextInput::make('custom_cta_title')
                            ->label('Judul')
                            ->placeholder('Harga Dikonfirmasi Admin'),

                        Textarea::make('custom_cta_description')
                            ->label('Deskripsi')
                            ->rows(2)
                            ->placeholder('Tim kami akan menghubungimu dalam 1×24 jam dengan penawaran terbaik.')
                            ->columnSpanFull(),
                    ])->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        SiteSetting::set('booking_settings', json_encode([
            'custom_cta_title'       => $data['custom_cta_title'],
            'custom_cta_description' => $data['custom_cta_description'],
        ]));

        Notification::make()
            ->title('Pengaturan booking berhasil disimpan!')
            ->success()
            ->send();
    }
}
