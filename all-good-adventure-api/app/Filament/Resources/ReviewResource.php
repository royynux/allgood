<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReviewResource\Pages;
use App\Models\Review;
use BackedEnum;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ReviewResource extends Resource
{
    protected static ?string $model = Review::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedStar;

    protected static ?string $navigationLabel = 'Reviews';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('destination_id')
                ->relationship('destination', 'name')
                ->searchable()
                ->required(),
            TextInput::make('reviewer_name')
                ->required()
                ->maxLength(255),
            Select::make('rating')
                ->options([1 => '⭐ 1', 2 => '⭐⭐ 2', 3 => '⭐⭐⭐ 3', 4 => '⭐⭐⭐⭐ 4', 5 => '⭐⭐⭐⭐⭐ 5'])
                ->required()
                ->default(5),
            DatePicker::make('trip_date')
                ->label('Tanggal Trip'),
            Textarea::make('comment')
                ->label('Ulasan')
                ->columnSpanFull(),
            Toggle::make('is_published')
                ->label('Tampilkan di Frontend')
                ->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('destination.name')->searchable()->sortable(),
                TextColumn::make('reviewer_name')->searchable(),
                TextColumn::make('rating')->sortable(),
                TextColumn::make('comment')->limit(60),
                TextColumn::make('trip_date')->date()->sortable(),
                IconColumn::make('is_published')->boolean(),
                TextColumn::make('created_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([EditAction::make()])
            ->bulkActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReviews::route('/'),
            'create' => Pages\CreateReview::route('/create'),
            'edit' => Pages\EditReview::route('/{record}/edit'),
        ];
    }
}
