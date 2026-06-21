<?php

namespace App\Filament\Pages;

use App\Models\SiteSetting;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class LoginSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-key';

    protected string $view = 'filament.pages.site-settings-page';

    protected static ?string $navigationLabel = 'Login Page';

    protected static ?string $title = 'Pengaturan Halaman Login';

    protected static \UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 4;

    public ?array $data = [];

    public function mount(): void
    {
        $login = json_decode(SiteSetting::get('login_page', '{}'), true) ?? [];

        $this->form->fill([
            'background_image'  => $login['background_image'] ?? null,
            'left_title'        => $login['left_title'] ?? 'Selamat Datang!',
            'left_description'  => $login['left_description'] ?? 'Login dan mulai petualangan private tripmu bersama kami.',
            'stat1_num'         => $login['stat1_num'] ?? '50+',
            'stat1_label'       => $login['stat1_label'] ?? 'Destinasi',
            'stat2_num'         => $login['stat2_num'] ?? '4.9★',
            'stat2_label'       => $login['stat2_label'] ?? 'Rating',
            'stat3_num'         => $login['stat3_num'] ?? '10K+',
            'stat3_label'       => $login['stat3_label'] ?? 'Traveler',
            'right_badge'       => $login['right_badge'] ?? '👋 Masuk ke akun kamu',
            'right_title'       => $login['right_title'] ?? 'Halo!',
            'right_description' => $login['right_description'] ?? 'Masuk untuk melihat booking dan riwayat tripmu.',
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('🖼️ Background Image')
                    ->description('Gambar latar panel kiri halaman login (hanya tampil di desktop).')
                    ->schema([
                        FileUpload::make('background_image')
                            ->label('Background Image')
                            ->image()
                            ->disk('public')
                            ->directory('site')
                            ->imagePreviewHeight('180')
                            ->columnSpanFull(),
                    ]),

                Section::make('📝 Panel Kiri — Judul & Deskripsi')
                    ->description('Teks yang tampil di panel kiri (hanya terlihat di layar desktop).')
                    ->schema([
                        TextInput::make('left_title')
                            ->label('Judul')
                            ->placeholder('Selamat Datang!'),

                        Textarea::make('left_description')
                            ->label('Deskripsi')
                            ->rows(2)
                            ->placeholder('Login dan mulai petualangan private tripmu bersama kami.')
                            ->columnSpanFull(),
                    ])->columns(2),

                Section::make('📊 Panel Kiri — 3 Statistik')
                    ->description('Tiga angka statistik yang tampil di bawah deskripsi panel kiri.')
                    ->schema([
                        TextInput::make('stat1_num')->label('Statistik 1 — Angka')->placeholder('50+'),
                        TextInput::make('stat1_label')->label('Statistik 1 — Label')->placeholder('Destinasi'),

                        TextInput::make('stat2_num')->label('Statistik 2 — Angka')->placeholder('4.9★'),
                        TextInput::make('stat2_label')->label('Statistik 2 — Label')->placeholder('Rating'),

                        TextInput::make('stat3_num')->label('Statistik 3 — Angka')->placeholder('10K+'),
                        TextInput::make('stat3_label')->label('Statistik 3 — Label')->placeholder('Traveler'),
                    ])->columns(2),

                Section::make('✏️ Panel Kanan — Form Login')
                    ->description('Teks yang tampil di sebelah kanan (area form login).')
                    ->schema([
                        TextInput::make('right_badge')
                            ->label('Teks Kecil (di atas judul)')
                            ->placeholder('👋 Masuk ke akun kamu'),

                        TextInput::make('right_title')
                            ->label('Judul')
                            ->placeholder('Halo!'),

                        Textarea::make('right_description')
                            ->label('Deskripsi')
                            ->rows(2)
                            ->placeholder('Masuk untuk melihat booking dan riwayat tripmu.')
                            ->columnSpanFull(),
                    ])->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        SiteSetting::set('login_page', json_encode([
            'background_image'  => $data['background_image'],
            'left_title'        => $data['left_title'],
            'left_description'  => $data['left_description'],
            'stat1_num'         => $data['stat1_num'],
            'stat1_label'       => $data['stat1_label'],
            'stat2_num'         => $data['stat2_num'],
            'stat2_label'       => $data['stat2_label'],
            'stat3_num'         => $data['stat3_num'],
            'stat3_label'       => $data['stat3_label'],
            'right_badge'       => $data['right_badge'],
            'right_title'       => $data['right_title'],
            'right_description' => $data['right_description'],
        ]));

        Notification::make()
            ->title('Pengaturan halaman login berhasil disimpan!')
            ->success()
            ->send();
    }
}
