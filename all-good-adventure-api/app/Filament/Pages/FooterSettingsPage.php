<?php

namespace App\Filament\Pages;

use App\Models\SiteSetting;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class FooterSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    protected string $view = 'filament.pages.site-settings-page';

    protected static ?string $navigationLabel = 'Pengaturan Footer';

    protected static ?string $title = 'Pengaturan Footer';

    protected static \UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 3;

    public ?array $data = [];

    public function mount(): void
    {
        $footer = json_decode(SiteSetting::get('footer', '{}'), true) ?? [];

        $this->form->fill([
            'footer_logo_image'      => $footer['logo_image'] ?? null,
            'footer_description'     => $footer['description'] ?? 'Spesialis private trip di Lombok. Kami hadir untuk membuat setiap perjalananmu eksklusif, personal, dan tak terlupakan.',
            'footer_whatsapp_number' => $footer['whatsapp_number'] ?? '6285333043941',
            'footer_address'         => $footer['address'] ?? 'Jalan Kampung Inggris No.11, Tetebatu, Kec. Sikur, Kabupaten Lombok Timur, Nusa Tenggara Barat. 83662',
            'footer_map_url'         => $footer['map_url'] ?? 'https://maps.app.goo.gl/tdZaQu93HHejFJg26?g_st=ic',
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('🦶 Footer Website')
                    ->description('Logo, deskripsi singkat, nomor WhatsApp, dan lokasi yang tampil di bagian footer (paling bawah) seluruh halaman website.')
                    ->schema([
                        FileUpload::make('footer_logo_image')
                            ->label('Logo Footer')
                            ->image()
                            ->disk('public')
                            ->directory('site')
                            ->imagePreviewHeight('80')
                            ->helperText('Jika dikosongkan, ikon 🏔️ default akan tetap ditampilkan.')
                            ->columnSpanFull(),

                        Textarea::make('footer_description')
                            ->label('Deskripsi Singkat')
                            ->rows(3)
                            ->columnSpanFull(),

                        TextInput::make('footer_whatsapp_number')
                            ->label('Nomor WhatsApp')
                            ->placeholder('6285333043941')
                            ->helperText('Gunakan format internasional tanpa tanda "+" atau spasi, contoh: 6285333043941 (untuk nomor 085333043941). Tombol "Hubungi via WhatsApp" di footer akan terhubung ke nomor ini.')
                            ->required(),

                        TextInput::make('footer_map_url')
                            ->label('Link Google Maps')
                            ->url()
                            ->placeholder('https://maps.app.goo.gl/...')
                            ->helperText('Tautan lokasi Google Maps. Akan dibuka saat alamat di footer diklik.'),

                        Textarea::make('footer_address')
                            ->label('Alamat / Lokasi')
                            ->rows(2)
                            ->placeholder('Jalan Kampung Inggris No.11, Tetebatu, Kec. Sikur, Kabupaten Lombok Timur, Nusa Tenggara Barat. 83662')
                            ->columnSpanFull(),
                    ])->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        SiteSetting::set('footer', json_encode([
            'logo_image'      => $data['footer_logo_image'],
            'description'     => $data['footer_description'],
            'whatsapp_number' => $data['footer_whatsapp_number'],
            'address'         => $data['footer_address'],
            'map_url'         => $data['footer_map_url'],
        ]));

        Notification::make()
            ->title('Pengaturan footer berhasil disimpan!')
            ->success()
            ->send();
    }
}
