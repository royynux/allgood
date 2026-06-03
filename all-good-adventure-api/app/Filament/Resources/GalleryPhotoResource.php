<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GalleryPhotoResource\Pages;
use App\Models\GalleryPhoto;
use Filament\Forms\Components\FileUpload;
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

class GalleryPhotoResource extends Resource
{
    protected static ?string $model = GalleryPhoto::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationLabel = 'Galeri Foto';

    protected static ?string $modelLabel = 'Foto Galeri';

    protected static ?string $pluralModelLabel = 'Galeri Foto';

    protected static \UnitEnum|string|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Upload Foto')->schema([
                FileUpload::make('image')
                    ->label('Foto')
                    ->image()
                    ->disk('public')
                    ->directory('gallery')
                    ->imagePreviewHeight('200')
                    ->required(),

                TextInput::make('caption')
                    ->label('Keterangan (Opsional)')
                    ->maxLength(255),
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
                ImageColumn::make('image')
                    ->label('Foto')
                    ->width(120)
                    ->height(80),

                TextColumn::make('caption')
                    ->label('Keterangan')
                    ->default('—'),

                TextColumn::make('sort_order')
                    ->label('Urutan')
                    ->sortable(),

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
            'index'  => Pages\ListGalleryPhotos::route('/'),
            'create' => Pages\CreateGalleryPhoto::route('/create'),
            'edit'   => Pages\EditGalleryPhoto::route('/{record}/edit'),
        ];
    }
}
