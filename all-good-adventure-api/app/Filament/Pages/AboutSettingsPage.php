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

class AboutSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-information-circle';

    protected string $view = 'filament.pages.site-settings-page';

    protected static ?string $navigationLabel = 'Pengaturan Tentang Kami';

    protected static ?string $title = 'Pengaturan Halaman Tentang Kami';

    protected static \UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 2;

    public ?array $data = [];

    public function mount(): void
    {
        $aboutHero = json_decode(SiteSetting::get('about_hero', '{}'), true) ?? [];
        $aboutStory = json_decode(SiteSetting::get('about_story', '{}'), true) ?? [];
        $aboutStats = json_decode(SiteSetting::get('about_stats', '{}'), true) ?? [];
        $valuesSection = json_decode(SiteSetting::get('values_section', '{}'), true) ?? [];
        $valuesItems = json_decode(SiteSetting::get('values_items', '[]'), true) ?? [];
        $teamSection = json_decode(SiteSetting::get('team_section', '{}'), true) ?? [];
        $aboutCta = json_decode(SiteSetting::get('about_cta', '{}'), true) ?? [];

        $this->form->fill([
            'about_hero_background_image' => $aboutHero['background_image'] ?? null,
            'about_hero_badge_text'       => $aboutHero['badge_text'] ?? '🏔️ Sejak 2018 — Lombok',
            'about_hero_headline'         => $aboutHero['headline'] ?? 'Kami adalah All Good Adventure',
            'about_hero_description'      => $aboutHero['description'] ?? 'Berawal dari kecintaan terhadap alam Lombok, kami hadir sebagai spesialis private trip terpercaya untuk setiap perjalananmu.',

            'about_story_image'        => $aboutStory['image'] ?? null,
            'about_story_title'        => $aboutStory['title'] ?? 'Dari Hobi Menjadi Misi',
            'about_story_description1' => $aboutStory['description1'] ?? 'All Good Adventure lahir pada tahun 2018 dari sebuah grup pendakian kecil di Lombok. Kami percaya bahwa setiap orang berhak merasakan keajaiban alam Lombok — tanpa kerumitan dan rasa khawatir.',
            'about_story_description2' => $aboutStory['description2'] ?? 'Selama 7 tahun, kami telah menemani lebih dari 10.000 traveler dari seluruh Indonesia dan dunia menjelajahi keindahan Lombok.',

            'about_stat1_num'   => $aboutStats['stat1_num'] ?? '7+',
            'about_stat1_label' => $aboutStats['stat1_label'] ?? 'Tahun Berpengalaman',
            'about_stat2_num'   => $aboutStats['stat2_num'] ?? '10K+',
            'about_stat2_label' => $aboutStats['stat2_label'] ?? 'Traveler Puas',
            'about_stat3_num'   => $aboutStats['stat3_num'] ?? '50+',
            'about_stat3_label' => $aboutStats['stat3_label'] ?? 'Destinasi',
            'about_stat4_num'   => $aboutStats['stat4_num'] ?? '48',
            'about_stat4_label' => $aboutStats['stat4_label'] ?? 'Guide Aktif',

            'values_section_label' => $valuesSection['label'] ?? 'Nilai Kami',
            'values_section_title' => $valuesSection['title'] ?? 'Yang Kami Pegang Teguh',

            'values_item1_title' => $valuesItems[0]['title'] ?? 'Cinta Lingkungan',
            'values_item1_desc'  => $valuesItems[0]['desc'] ?? 'Setiap trip dirancang untuk menghormati kelestarian alam dan budaya Lombok & Bali.',
            'values_item2_title' => $valuesItems[1]['title'] ?? 'Keselamatan Utama',
            'values_item2_desc'  => $valuesItems[1]['desc'] ?? 'Standar keselamatan ketat, asuransi perjalanan, dan guide bersertifikat.',
            'values_item3_title' => $valuesItems[2]['title'] ?? '100% Private',
            'values_item3_desc'  => $valuesItems[2]['desc'] ?? 'Tripmu eksklusif hanya untuk kamu dan rombongan. Tidak ada stranger yang ikut.',
            'values_item4_title' => $valuesItems[3]['title'] ?? 'Pengalaman Terbaik',
            'values_item4_desc'  => $valuesItems[3]['desc'] ?? 'Setiap detail dirancang untuk kenangan yang tak terlupakan seumur hidup.',

            'team_section_label' => $teamSection['label'] ?? 'Tim Kami',
            'team_section_title' => $teamSection['title'] ?? 'Orang-orang di Balik AGA',

            'about_cta_title'       => $aboutCta['title'] ?? 'Siap Memulai Petualanganmu?',
            'about_cta_description' => $aboutCta['description'] ?? 'Bergabunglah dengan 10.000+ traveler yang sudah mempercayai All Good Adventure.',
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('ℹ️ Hero Banner')
                    ->description('Bagian header di halaman Tentang Kami.')
                    ->schema([
                        FileUpload::make('about_hero_background_image')
                            ->label('Background Image')
                            ->image()
                            ->disk('public')
                            ->directory('site')
                            ->imagePreviewHeight('150'),

                        TextInput::make('about_hero_badge_text')
                            ->label('Teks Badge')
                            ->placeholder('🏔️ Sejak 2018 — Lombok'),

                        TextInput::make('about_hero_headline')
                            ->label('Headline')
                            ->placeholder('Kami adalah All Good Adventure'),

                        Textarea::make('about_hero_description')
                            ->label('Deskripsi')
                            ->rows(3),
                    ])->columns(2),

                Section::make('📖 Cerita Kami')
                    ->description('Section "Dari Hobi Menjadi Misi" di halaman Tentang.')
                    ->schema([
                        FileUpload::make('about_story_image')
                            ->label('Gambar Cerita')
                            ->image()
                            ->disk('public')
                            ->directory('site')
                            ->imagePreviewHeight('150'),

                        TextInput::make('about_story_title')
                            ->label('Judul')
                            ->placeholder('Dari Hobi Menjadi Misi'),

                        Textarea::make('about_story_description1')
                            ->label('Paragraf 1')
                            ->rows(3),

                        Textarea::make('about_story_description2')
                            ->label('Paragraf 2')
                            ->rows(3),
                    ])->columns(2),

                Section::make('📊 Statistik')
                    ->description('4 angka statistik yang tampil di bagian Hero halaman Tentang Kami (mis. "7+ Tahun Berpengalaman").')
                    ->schema([
                        TextInput::make('about_stat1_num')->label('Statistik 1 — Angka')->placeholder('7+'),
                        TextInput::make('about_stat1_label')->label('Statistik 1 — Label')->placeholder('Tahun Berpengalaman'),

                        TextInput::make('about_stat2_num')->label('Statistik 2 — Angka')->placeholder('10K+'),
                        TextInput::make('about_stat2_label')->label('Statistik 2 — Label')->placeholder('Traveler Puas'),

                        TextInput::make('about_stat3_num')->label('Statistik 3 — Angka')->placeholder('50+'),
                        TextInput::make('about_stat3_label')->label('Statistik 3 — Label')->placeholder('Destinasi'),

                        TextInput::make('about_stat4_num')->label('Statistik 4 — Angka')->placeholder('48'),
                        TextInput::make('about_stat4_label')->label('Statistik 4 — Label')->placeholder('Guide Aktif'),
                    ])->columns(2),

                Section::make('💎 Nilai Kami — Judul Section')
                    ->description('Label dan judul pada section "Yang Kami Pegang Teguh".')
                    ->schema([
                        TextInput::make('values_section_label')
                            ->label('Label Kecil (di atas judul)')
                            ->placeholder('Nilai Kami'),

                        TextInput::make('values_section_title')
                            ->label('Judul Section')
                            ->placeholder('Yang Kami Pegang Teguh'),
                    ])->columns(2),

                Section::make('💎 Nilai Kami — 4 Poin Nilai')
                    ->description('Judul dan deskripsi dari 4 kartu nilai pada section "Yang Kami Pegang Teguh". Ikon (🌿 🛡️ 🔒 ⭐) tetap dan tidak bisa diubah.')
                    ->schema([
                        TextInput::make('values_item1_title')
                            ->label('🌿 Poin 1 — Judul')
                            ->placeholder('Cinta Lingkungan'),
                        Textarea::make('values_item1_desc')
                            ->label('🌿 Poin 1 — Deskripsi')
                            ->rows(2),

                        TextInput::make('values_item2_title')
                            ->label('🛡️ Poin 2 — Judul')
                            ->placeholder('Keselamatan Utama'),
                        Textarea::make('values_item2_desc')
                            ->label('🛡️ Poin 2 — Deskripsi')
                            ->rows(2),

                        TextInput::make('values_item3_title')
                            ->label('🔒 Poin 3 — Judul')
                            ->placeholder('100% Private'),
                        Textarea::make('values_item3_desc')
                            ->label('🔒 Poin 3 — Deskripsi')
                            ->rows(2),

                        TextInput::make('values_item4_title')
                            ->label('⭐ Poin 4 — Judul')
                            ->placeholder('Pengalaman Terbaik'),
                        Textarea::make('values_item4_desc')
                            ->label('⭐ Poin 4 — Deskripsi')
                            ->rows(2),
                    ])->columns(2),

                Section::make('👥 Tim Kami — Judul Section')
                    ->description('Atur label dan judul section yang menampilkan daftar anggota tim pada halaman "Tentang Kami".')
                    ->schema([
                        TextInput::make('team_section_label')
                            ->label('Label Kecil (di atas judul)')
                            ->placeholder('Tim Kami'),

                        TextInput::make('team_section_title')
                            ->label('Judul Section')
                            ->placeholder('Orang-orang di Balik AGA'),
                    ])->columns(2),

                Section::make('📣 CTA Penutup')
                    ->description('Banner ajakan di bagian paling bawah halaman Tentang Kami ("Siap Memulai Petualanganmu?").')
                    ->schema([
                        TextInput::make('about_cta_title')
                            ->label('Judul')
                            ->placeholder('Siap Memulai Petualanganmu?'),

                        Textarea::make('about_cta_description')
                            ->label('Deskripsi')
                            ->rows(2)
                            ->columnSpanFull(),
                    ])->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        SiteSetting::set('about_hero', json_encode([
            'background_image' => $data['about_hero_background_image'],
            'badge_text'       => $data['about_hero_badge_text'],
            'headline'         => $data['about_hero_headline'],
            'description'      => $data['about_hero_description'],
        ]));

        SiteSetting::set('about_story', json_encode([
            'image'        => $data['about_story_image'],
            'title'        => $data['about_story_title'],
            'description1' => $data['about_story_description1'],
            'description2' => $data['about_story_description2'],
        ]));

        SiteSetting::set('about_stats', json_encode([
            'stat1_num'   => $data['about_stat1_num'],
            'stat1_label' => $data['about_stat1_label'],
            'stat2_num'   => $data['about_stat2_num'],
            'stat2_label' => $data['about_stat2_label'],
            'stat3_num'   => $data['about_stat3_num'],
            'stat3_label' => $data['about_stat3_label'],
            'stat4_num'   => $data['about_stat4_num'],
            'stat4_label' => $data['about_stat4_label'],
        ]));

        SiteSetting::set('values_section', json_encode([
            'label' => $data['values_section_label'],
            'title' => $data['values_section_title'],
        ]));

        SiteSetting::set('values_items', json_encode([
            ['title' => $data['values_item1_title'], 'desc' => $data['values_item1_desc']],
            ['title' => $data['values_item2_title'], 'desc' => $data['values_item2_desc']],
            ['title' => $data['values_item3_title'], 'desc' => $data['values_item3_desc']],
            ['title' => $data['values_item4_title'], 'desc' => $data['values_item4_desc']],
        ]));

        SiteSetting::set('team_section', json_encode([
            'label' => $data['team_section_label'],
            'title' => $data['team_section_title'],
        ]));

        SiteSetting::set('about_cta', json_encode([
            'title'       => $data['about_cta_title'],
            'description' => $data['about_cta_description'],
        ]));

        Notification::make()
            ->title('Pengaturan halaman Tentang Kami berhasil disimpan!')
            ->success()
            ->send();
    }
}
