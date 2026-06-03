<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Models\Testimonial;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationLabel = 'Testimoni';

    protected static ?string $modelLabel = 'Testimoni';

    protected static ?string $pluralModelLabel = 'Testimoni';

    protected static \UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Informasi Reviewer')->schema([
                TextInput::make('reviewer_name')
                    ->label('Nama Reviewer')
                    ->required()
                    ->maxLength(255),

                TextInput::make('reviewer_role')
                    ->label('Keterangan (mis: Private Trip Rinjani — Jan 2026)')
                    ->maxLength(255),

                FileUpload::make('reviewer_avatar')
                    ->label('Foto Profil Reviewer')
                    ->image()
                    ->disk('public')
                    ->directory('testimonials')
                    ->imagePreviewHeight('100'),
            ]),

            Section::make('Ulasan')->schema([
                Select::make('rating')
                    ->label('Rating')
                    ->options([
                        5 => '⭐⭐⭐⭐⭐ (5)',
                        4 => '⭐⭐⭐⭐ (4)',
                        3 => '⭐⭐⭐ (3)',
                        2 => '⭐⭐ (2)',
                        1 => '⭐ (1)',
                    ])
                    ->default(5)
                    ->required(),

                Textarea::make('comment')
                    ->label('Isi Ulasan')
                    ->required()
                    ->rows(4)
                    ->maxLength(1000),
            ]),

            Section::make('Pengaturan')->schema([
                TextInput::make('sort_order')
                    ->label('Urutan Tampil')
                    ->numeric()
                    ->default(0),

                Toggle::make('is_active')
                    ->label('Tampilkan di Website')
                    ->default(true),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('reviewer_avatar')
                    ->label('Foto')
                    ->circular(),

                TextColumn::make('reviewer_name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('reviewer_role')
                    ->label('Keterangan')
                    ->limit(40),

                TextColumn::make('rating')
                    ->label('Rating')
                    ->formatStateUsing(fn ($state) => str_repeat('⭐', $state)),

                TextColumn::make('comment')
                    ->label('Ulasan')
                    ->limit(60),

                ToggleColumn::make('is_active')
                    ->label('Tampil'),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit'   => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}
