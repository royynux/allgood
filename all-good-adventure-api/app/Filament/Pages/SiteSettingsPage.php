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

class SiteSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected string $view = 'filament.pages.site-settings-page';

    protected static ?string $navigationLabel = 'Pengaturan Website';

    protected static ?string $title = 'Pengaturan Website';

    protected static \UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 1;

    public ?array $data = [];

    public function mount(): void
    {
        $hero = json_decode(SiteSetting::get('hero', '{}'), true) ?? [];
        $aboutHero = json_decode(SiteSetting::get('about_hero', '{}'), true) ?? [];
        $aboutStory = json_decode(SiteSetting::get('about_story', '{}'), true) ?? [];
        $whyusImages = json_decode(SiteSetting::get('whyus_images', '{}'), true) ?? [];
        $heroStats = json_decode(SiteSetting::get('hero_stats', '{}'), true) ?? [];
        $aboutStats = json_decode(SiteSetting::get('about_stats', '{}'), true) ?? [];

        $this->form->fill([
            'hero_background_image'    => $hero['background_image'] ?? null,
            'hero_badge_text'          => $hero['badge_text'] ?? '🌄 Private Trip Specialist — Lombok',
            'hero_title_line1'         => $hero['title_line1'] ?? 'Kamu Pusing?',
            'hero_title_line2_colored' => $hero['title_line2_colored'] ?? 'Yuk Healing',
            'hero_title_line3'         => $hero['title_line3'] ?? 'Bareng Kami!',
            'hero_description'         => $hero['description'] ?? 'Temukan pengalaman private trip terbaik di Lombok — dari pendakian Rinjani, island hopping Gili, hingga private getaway eksklusif untuk kamu dan orang-orang terkasih.',

            'about_hero_background_image' => $aboutHero['background_image'] ?? null,
            'about_hero_badge_text'       => $aboutHero['badge_text'] ?? '🏔️ Sejak 2018 — Lombok',
            'about_hero_headline'         => $aboutHero['headline'] ?? 'Kami adalah All Good Adventure',
            'about_hero_description'      => $aboutHero['description'] ?? 'Berawal dari kecintaan terhadap alam Lombok, kami hadir sebagai spesialis private trip terpercaya untuk setiap perjalananmu.',

            'about_story_image'        => $aboutStory['image'] ?? null,
            'about_story_title'        => $aboutStory['title'] ?? 'Dari Hobi Menjadi Misi',
            'about_story_description1' => $aboutStory['description1'] ?? 'All Good Adventure lahir pada tahun 2018 dari sebuah grup pendakian kecil di Lombok. Kami percaya bahwa setiap orang berhak merasakan keajaiban alam Lombok — tanpa kerumitan dan rasa khawatir.',
            'about_story_description2' => $aboutStory['description2'] ?? 'Selama 7 tahun, kami telah menemani lebih dari 10.000 traveler dari seluruh Indonesia dan dunia menjelajahi keindahan Lombok.',

            'whyus_image_1' => $whyusImages['image_1'] ?? null,
            'whyus_image_2' => $whyusImages['image_2'] ?? null,
            'whyus_image_3' => $whyusImages['image_3'] ?? null,
            'whyus_image_4' => $whyusImages['image_4'] ?? null,

            'hero_stat1_num'   => $heroStats['stat1_num'] ?? '50+',
            'hero_stat1_label' => $heroStats['stat1_label'] ?? 'Destinasi Lombok & Bali',
            'hero_stat2_num'   => $heroStats['stat2_num'] ?? '10K+',
            'hero_stat2_label' => $heroStats['stat2_label'] ?? 'Traveler Puas',
            'hero_stat3_num'   => $heroStats['stat3_num'] ?? '100%',
            'hero_stat3_label' => $heroStats['stat3_label'] ?? 'Private Trip',
            'hero_stat4_num'   => $heroStats['stat4_num'] ?? '48',
            'hero_stat4_label' => $heroStats['stat4_label'] ?? 'Tour Guide Aktif',

            'about_stat1_num'   => $aboutStats['stat1_num'] ?? '7+',
            'about_stat1_label' => $aboutStats['stat1_label'] ?? 'Tahun Berpengalaman',
            'about_stat2_num'   => $aboutStats['stat2_num'] ?? '10K+',
            'about_stat2_label' => $aboutStats['stat2_label'] ?? 'Traveler Puas',
            'about_stat3_num'   => $aboutStats['stat3_num'] ?? '50+',
            'about_stat3_label' => $aboutStats['stat3_label'] ?? 'Destinasi',
            'about_stat4_num'   => $aboutStats['stat4_num'] ?? '48',
            'about_stat4_label' => $aboutStats['stat4_label'] ?? 'Guide Aktif',
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('🏠 Hero Section (Halaman Utama)')
                    ->description('Bagian pertama yang dilihat pengunjung di halaman utama.')
                    ->schema([
                        FileUpload::make('hero_background_image')
                            ->label('Background Image Hero')
                            ->image()
                            ->disk('public')
                            ->directory('site')
                            ->imagePreviewHeight('150')
                            ->helperText('Gambar background utama halaman beranda.'),

                        TextInput::make('hero_badge_text')
                            ->label('Teks Badge (atas judul)')
                            ->placeholder('🌄 Private Trip Specialist — Lombok'),

                        TextInput::make('hero_title_line1')
                            ->label('Judul Baris 1')
                            ->placeholder('Kamu Pusing?'),

                        TextInput::make('hero_title_line2_colored')
                            ->label('Judul Baris 2 (warna orange)')
                            ->placeholder('Yuk Healing'),

                        TextInput::make('hero_title_line3')
                            ->label('Judul Baris 3')
                            ->placeholder('Bareng Kami!'),

                        Textarea::make('hero_description')
                            ->label('Deskripsi Hero')
                            ->rows(3),
                    ])->columns(2),

                Section::make('ℹ️ Halaman Tentang — Hero Banner')
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

                Section::make('📖 Halaman Tentang — Cerita Kami')
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

                Section::make('🖼️ Kenapa Memilih Kami — 4 Gambar')
                    ->description('4 gambar di sebelah kanan bagian "Kenapa Memilih All Good Adventure?" pada halaman utama.')
                    ->schema([
                        FileUpload::make('whyus_image_1')
                            ->label('Gambar 1 (kiri atas)')
                            ->image()
                            ->disk('public')
                            ->directory('site')
                            ->imagePreviewHeight('120'),

                        FileUpload::make('whyus_image_2')
                            ->label('Gambar 2 (kanan atas — lebih tinggi)')
                            ->image()
                            ->disk('public')
                            ->directory('site')
                            ->imagePreviewHeight('120'),

                        FileUpload::make('whyus_image_3')
                            ->label('Gambar 3 (kiri bawah)')
                            ->image()
                            ->disk('public')
                            ->directory('site')
                            ->imagePreviewHeight('120'),

                        FileUpload::make('whyus_image_4')
                            ->label('Gambar 4 (kanan bawah)')
                            ->image()
                            ->disk('public')
                            ->directory('site')
                            ->imagePreviewHeight('120'),
                    ])->columns(2),

                Section::make('📊 Statistik — Halaman Utama (Hero)')
                    ->description('4 angka statistik yang tampil di bagian bawah Hero pada halaman utama (mis. "50+ Destinasi Lombok & Bali").')
                    ->schema([
                        TextInput::make('hero_stat1_num')->label('Statistik 1 — Angka')->placeholder('50+'),
                        TextInput::make('hero_stat1_label')->label('Statistik 1 — Label')->placeholder('Destinasi Lombok & Bali'),

                        TextInput::make('hero_stat2_num')->label('Statistik 2 — Angka')->placeholder('10K+'),
                        TextInput::make('hero_stat2_label')->label('Statistik 2 — Label')->placeholder('Traveler Puas'),

                        TextInput::make('hero_stat3_num')->label('Statistik 3 — Angka')->placeholder('100%'),
                        TextInput::make('hero_stat3_label')->label('Statistik 3 — Label')->placeholder('Private Trip'),

                        TextInput::make('hero_stat4_num')->label('Statistik 4 — Angka')->placeholder('48'),
                        TextInput::make('hero_stat4_label')->label('Statistik 4 — Label')->placeholder('Tour Guide Aktif'),
                    ])->columns(2),

                Section::make('📊 Statistik — Halaman Tentang')
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
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        SiteSetting::set('hero', json_encode([
            'background_image'    => $data['hero_background_image'],
            'badge_text'          => $data['hero_badge_text'],
            'title_line1'         => $data['hero_title_line1'],
            'title_line2_colored' => $data['hero_title_line2_colored'],
            'title_line3'         => $data['hero_title_line3'],
            'description'         => $data['hero_description'],
        ]));

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

        SiteSetting::set('whyus_images', json_encode([
            'image_1' => $data['whyus_image_1'],
            'image_2' => $data['whyus_image_2'],
            'image_3' => $data['whyus_image_3'],
            'image_4' => $data['whyus_image_4'],
        ]));

        SiteSetting::set('hero_stats', json_encode([
            'stat1_num'   => $data['hero_stat1_num'],
            'stat1_label' => $data['hero_stat1_label'],
            'stat2_num'   => $data['hero_stat2_num'],
            'stat2_label' => $data['hero_stat2_label'],
            'stat3_num'   => $data['hero_stat3_num'],
            'stat3_label' => $data['hero_stat3_label'],
            'stat4_num'   => $data['hero_stat4_num'],
            'stat4_label' => $data['hero_stat4_label'],
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

        Notification::make()
            ->title('Pengaturan berhasil disimpan!')
            ->success()
            ->send();
    }
}
