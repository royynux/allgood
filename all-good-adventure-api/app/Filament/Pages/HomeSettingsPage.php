<?php

namespace App\Filament\Pages;

use App\Models\Destination;
use App\Models\SiteSetting;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class HomeSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-home';

    protected string $view = 'filament.pages.site-settings-page';

    protected static ?string $navigationLabel = 'Pengaturan Beranda';

    protected static ?string $title = 'Pengaturan Halaman Utama (Beranda)';

    protected static \UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 1;

    public ?array $data = [];

    public function mount(): void
    {
        $hero = json_decode(SiteSetting::get('hero', '{}'), true) ?? [];
        $whyusSection = json_decode(SiteSetting::get('whyus_section', '{}'), true) ?? [];
        $whyusItems = json_decode(SiteSetting::get('whyus_items', '[]'), true) ?? [];
        $whyusImages = json_decode(SiteSetting::get('whyus_images', '{}'), true) ?? [];
        $howToBookSection = json_decode(SiteSetting::get('how_to_book_section', '{}'), true) ?? [];
        $howToBookSteps = json_decode(SiteSetting::get('how_to_book_steps', '[]'), true) ?? [];
        $heroStats = json_decode(SiteSetting::get('hero_stats', '{}'), true) ?? [];
        $featuredSection = json_decode(SiteSetting::get('featured_destinations_section', '{}'), true) ?? [];
        $featuredDestinationIds = Destination::where('is_featured_home', true)->pluck('id')->toArray();

        $this->form->fill([
            'hero_background_image'    => $hero['background_image'] ?? null,
            'hero_badge_text'          => $hero['badge_text'] ?? '🌄 Private Trip Specialist — Lombok',
            'hero_title_line1'         => $hero['title_line1'] ?? 'Kamu Pusing?',
            'hero_title_line2_colored' => $hero['title_line2_colored'] ?? 'Yuk Healing',
            'hero_title_line3'         => $hero['title_line3'] ?? 'Bareng Kami!',
            'hero_description'         => $hero['description'] ?? 'Temukan pengalaman private trip terbaik di Lombok — dari pendakian Rinjani, island hopping Gili, hingga private getaway eksklusif untuk kamu dan orang-orang terkasih.',

            'whyus_section_label'       => $whyusSection['label'] ?? 'Kenapa Kami',
            'whyus_section_title'       => $whyusSection['title'] ?? 'Kenapa Memilih All Good Adventure?',
            'whyus_section_description' => $whyusSection['description'] ?? 'Kami spesialis private trip di Bali dan Lombok — memastikan setiap perjalananmu eksklusif, aman, dan sesuai keinginanmu.',

            'whyus_item1_title' => $whyusItems[0]['title'] ?? 'Destinasi Terbaik Lombok',
            'whyus_item1_desc'  => $whyusItems[0]['desc'] ?? 'Dari puncak Rinjani, Gili Islands, Selong Belanak hingga spot tersembunyi yang hanya kami tahu.',
            'whyus_item2_title' => $whyusItems[1]['title'] ?? 'Tour Guide Bersertifikat',
            'whyus_item2_desc'  => $whyusItems[1]['desc'] ?? 'Semua guide kami telah tersertifikasi BNSP, berpengalaman, dan siap membuat tripmu luar biasa.',
            'whyus_item3_title' => $whyusItems[2]['title'] ?? '100% Private Trip',
            'whyus_item3_desc'  => $whyusItems[2]['desc'] ?? 'Tripmu hanya untuk kamu dan rombonganmu. Tidak ada orang asing yang ikut serta.',
            'whyus_item4_title' => $whyusItems[3]['title'] ?? 'Keamanan Terjamin',
            'whyus_item4_desc'  => $whyusItems[3]['desc'] ?? 'Semua trip dilengkapi asuransi perjalanan dan pemandu berlisensi resmi.',

            'whyus_image_1' => $whyusImages['image_1'] ?? null,
            'whyus_image_2' => $whyusImages['image_2'] ?? null,
            'whyus_image_3' => $whyusImages['image_3'] ?? null,
            'whyus_image_4' => $whyusImages['image_4'] ?? null,

            'how_to_book_label' => $howToBookSection['label'] ?? 'Cara Pesan',
            'how_to_book_title' => $howToBookSection['title'] ?? 'Cara Booking Private Trip Mudah & Cepat',

            'how_to_book_step1_title' => $howToBookSteps[0]['title'] ?? 'Pilih Destinasi',
            'how_to_book_step1_desc'  => $howToBookSteps[0]['desc'] ?? 'Browse destinasi Lombok favorit dari katalog kami.',
            'how_to_book_step2_title' => $howToBookSteps[1]['title'] ?? 'Pilih Tour Guide',
            'how_to_book_step2_desc'  => $howToBookSteps[1]['desc'] ?? 'Pilih tour guide bersertifikat sesuai spesialisasi dan kebutuhan trip.',
            'how_to_book_step3_title' => $howToBookSteps[2]['title'] ?? 'Atur Jadwal',
            'how_to_book_step3_desc'  => $howToBookSteps[2]['desc'] ?? 'Tentukan tanggal, durasi, dan jumlah peserta tripmu.',
            'how_to_book_step4_title' => $howToBookSteps[3]['title'] ?? 'Isi Data Diri',
            'how_to_book_step4_desc'  => $howToBookSteps[3]['desc'] ?? 'Lengkapi informasi kontak dan permintaan khusus.',
            'how_to_book_step5_title' => $howToBookSteps[4]['title'] ?? 'Cek Ringkasan',
            'how_to_book_step5_desc'  => $howToBookSteps[4]['desc'] ?? 'Review total biaya dan detail trip sebelum submit.',
            'how_to_book_step6_title' => $howToBookSteps[5]['title'] ?? 'Siap Berangkat! 🎉',
            'how_to_book_step6_desc'  => $howToBookSteps[5]['desc'] ?? 'Tim kami menghubungimu dalam 1×24 jam untuk konfirmasi.',

            'hero_stat1_num'   => $heroStats['stat1_num'] ?? '50+',
            'hero_stat1_label' => $heroStats['stat1_label'] ?? 'Destinasi Lombok & Bali',
            'hero_stat2_num'   => $heroStats['stat2_num'] ?? '10K+',
            'hero_stat2_label' => $heroStats['stat2_label'] ?? 'Traveler Puas',
            'hero_stat3_num'   => $heroStats['stat3_num'] ?? '100%',
            'hero_stat3_label' => $heroStats['stat3_label'] ?? 'Private Trip',
            'hero_stat4_num'   => $heroStats['stat4_num'] ?? '48',
            'hero_stat4_label' => $heroStats['stat4_label'] ?? 'Tour Guide Aktif',

            'featured_section_label'       => $featuredSection['label'] ?? 'Destinasi Pilihan',
            'featured_section_title'       => $featuredSection['title'] ?? 'Private Trip Terpopuler di Lombok',
            'featured_section_description' => $featuredSection['description'] ?? 'Semua perjalanan dirancang khusus untuk kamu — 100% private, no strangers!',
            'featured_destination_ids'     => $featuredDestinationIds,
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('🏠 Hero Section')
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

                Section::make('💡 Kenapa Kami — Teks')
                    ->description('Label, judul, dan deskripsi pada section "Kenapa Memilih All Good Adventure?".')
                    ->schema([
                        TextInput::make('whyus_section_label')
                            ->label('Label Kecil (di atas judul)')
                            ->placeholder('Kenapa Kami'),

                        TextInput::make('whyus_section_title')
                            ->label('Judul Section')
                            ->placeholder('Kenapa Memilih All Good Adventure?'),

                        Textarea::make('whyus_section_description')
                            ->label('Deskripsi')
                            ->rows(2)
                            ->columnSpanFull(),
                    ])->columns(2),

                Section::make('✅ Kenapa Kami — 4 Poin Alasan')
                    ->description('Judul dan deskripsi dari 4 kartu alasan di section "Kenapa Memilih All Good Adventure?". Ikon (🗺️ 👤 🔒 🛡️) tetap dan tidak bisa diubah.')
                    ->schema([
                        TextInput::make('whyus_item1_title')
                            ->label('🗺️ Poin 1 — Judul')
                            ->placeholder('Destinasi Terbaik Lombok'),
                        Textarea::make('whyus_item1_desc')
                            ->label('🗺️ Poin 1 — Deskripsi')
                            ->rows(2),

                        TextInput::make('whyus_item2_title')
                            ->label('👤 Poin 2 — Judul')
                            ->placeholder('Tour Guide Bersertifikat'),
                        Textarea::make('whyus_item2_desc')
                            ->label('👤 Poin 2 — Deskripsi')
                            ->rows(2),

                        TextInput::make('whyus_item3_title')
                            ->label('🔒 Poin 3 — Judul')
                            ->placeholder('100% Private Trip'),
                        Textarea::make('whyus_item3_desc')
                            ->label('🔒 Poin 3 — Deskripsi')
                            ->rows(2),

                        TextInput::make('whyus_item4_title')
                            ->label('🛡️ Poin 4 — Judul')
                            ->placeholder('Keamanan Terjamin'),
                        Textarea::make('whyus_item4_desc')
                            ->label('🛡️ Poin 4 — Deskripsi')
                            ->rows(2),
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

                Section::make('📝 Cara Booking — Judul Section')
                    ->description('Label dan judul pada section "Cara Booking Private Trip Mudah & Cepat" di halaman utama.')
                    ->schema([
                        TextInput::make('how_to_book_label')
                            ->label('Label Kecil (di atas judul)')
                            ->placeholder('Cara Pesan'),

                        TextInput::make('how_to_book_title')
                            ->label('Judul Section')
                            ->placeholder('Cara Booking Private Trip Mudah & Cepat'),
                    ])->columns(2),

                Section::make('📝 Cara Booking — 6 Langkah')
                    ->description('Judul dan deskripsi dari masing-masing 6 langkah cara booking. Nomor urut (1-6) tetap dan tidak bisa diubah.')
                    ->schema([
                        TextInput::make('how_to_book_step1_title')
                            ->label('Langkah 1 — Judul')
                            ->placeholder('Pilih Destinasi'),
                        Textarea::make('how_to_book_step1_desc')
                            ->label('Langkah 1 — Deskripsi')
                            ->rows(2),

                        TextInput::make('how_to_book_step2_title')
                            ->label('Langkah 2 — Judul')
                            ->placeholder('Pilih Tour Guide'),
                        Textarea::make('how_to_book_step2_desc')
                            ->label('Langkah 2 — Deskripsi')
                            ->rows(2),

                        TextInput::make('how_to_book_step3_title')
                            ->label('Langkah 3 — Judul')
                            ->placeholder('Atur Jadwal'),
                        Textarea::make('how_to_book_step3_desc')
                            ->label('Langkah 3 — Deskripsi')
                            ->rows(2),

                        TextInput::make('how_to_book_step4_title')
                            ->label('Langkah 4 — Judul')
                            ->placeholder('Isi Data Diri'),
                        Textarea::make('how_to_book_step4_desc')
                            ->label('Langkah 4 — Deskripsi')
                            ->rows(2),

                        TextInput::make('how_to_book_step5_title')
                            ->label('Langkah 5 — Judul')
                            ->placeholder('Cek Ringkasan'),
                        Textarea::make('how_to_book_step5_desc')
                            ->label('Langkah 5 — Deskripsi')
                            ->rows(2),

                        TextInput::make('how_to_book_step6_title')
                            ->label('Langkah 6 — Judul')
                            ->placeholder('Siap Berangkat! 🎉'),
                        Textarea::make('how_to_book_step6_desc')
                            ->label('Langkah 6 — Deskripsi')
                            ->rows(2),
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

                Section::make('🏝️ Destinasi Pilihan')
                    ->description('Atur judul, deskripsi, dan destinasi mana saja yang ditampilkan pada section "Destinasi Pilihan" di halaman utama — semuanya dari sini, tidak perlu buka halaman edit destinasi satu per satu.')
                    ->schema([
                        TextInput::make('featured_section_label')
                            ->label('Label Kecil (di atas judul)')
                            ->placeholder('Destinasi Pilihan'),

                        TextInput::make('featured_section_title')
                            ->label('Judul Section')
                            ->placeholder('Private Trip Terpopuler di Lombok'),

                        Textarea::make('featured_section_description')
                            ->label('Deskripsi')
                            ->rows(2)
                            ->columnSpanFull(),

                        Select::make('featured_destination_ids')
                            ->label('Pilih Destinasi yang Ditampilkan')
                            ->helperText('Pilih maksimal 4 destinasi yang ingin ditampilkan di section ini pada halaman utama. Jika tidak ada yang dipilih, sistem akan menampilkan 4 destinasi pertama secara otomatis.')
                            ->options(fn () => Destination::where('is_active', true)->orderBy('name')->pluck('name', 'id'))
                            ->multiple()
                            ->maxItems(4)
                            ->searchable()
                            ->preload()
                            ->columnSpanFull(),
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

        SiteSetting::set('whyus_section', json_encode([
            'label'       => $data['whyus_section_label'],
            'title'       => $data['whyus_section_title'],
            'description' => $data['whyus_section_description'],
        ]));

        SiteSetting::set('whyus_items', json_encode([
            ['title' => $data['whyus_item1_title'], 'desc' => $data['whyus_item1_desc']],
            ['title' => $data['whyus_item2_title'], 'desc' => $data['whyus_item2_desc']],
            ['title' => $data['whyus_item3_title'], 'desc' => $data['whyus_item3_desc']],
            ['title' => $data['whyus_item4_title'], 'desc' => $data['whyus_item4_desc']],
        ]));

        SiteSetting::set('whyus_images', json_encode([
            'image_1' => $data['whyus_image_1'],
            'image_2' => $data['whyus_image_2'],
            'image_3' => $data['whyus_image_3'],
            'image_4' => $data['whyus_image_4'],
        ]));

        SiteSetting::set('how_to_book_section', json_encode([
            'label' => $data['how_to_book_label'],
            'title' => $data['how_to_book_title'],
        ]));

        SiteSetting::set('how_to_book_steps', json_encode([
            ['title' => $data['how_to_book_step1_title'], 'desc' => $data['how_to_book_step1_desc']],
            ['title' => $data['how_to_book_step2_title'], 'desc' => $data['how_to_book_step2_desc']],
            ['title' => $data['how_to_book_step3_title'], 'desc' => $data['how_to_book_step3_desc']],
            ['title' => $data['how_to_book_step4_title'], 'desc' => $data['how_to_book_step4_desc']],
            ['title' => $data['how_to_book_step5_title'], 'desc' => $data['how_to_book_step5_desc']],
            ['title' => $data['how_to_book_step6_title'], 'desc' => $data['how_to_book_step6_desc']],
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

        SiteSetting::set('featured_destinations_section', json_encode([
            'label'       => $data['featured_section_label'],
            'title'       => $data['featured_section_title'],
            'description' => $data['featured_section_description'],
        ]));

        $selectedDestinationIds = $data['featured_destination_ids'] ?? [];
        Destination::query()->update(['is_featured_home' => false]);
        if (! empty($selectedDestinationIds)) {
            Destination::whereIn('id', $selectedDestinationIds)->update(['is_featured_home' => true]);
        }

        Notification::make()
            ->title('Pengaturan beranda berhasil disimpan!')
            ->success()
            ->send();
    }
}
