<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Models\Booking;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;
    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedCalendarDays;
    protected static ?string $navigationLabel = 'Bookings';
    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Status & Pricing')->schema([
                TextInput::make('booking_code')->disabled(),
                Select::make('status')
                    ->options([
                        'pending'   => 'Pending',
                        'confirmed' => 'Confirmed',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),
                TextInput::make('estimated_total')
                    ->numeric()->prefix('Rp')->disabled(),
                TextInput::make('confirmed_total')
                    ->numeric()->prefix('Rp')
                    ->helperText('Fill in for custom trips after pricing is confirmed.'),
                Textarea::make('admin_notes')->columnSpanFull(),
            ])->columns(2),

            Section::make('Customer Info')->schema([
                TextInput::make('customer_name')->disabled(),
                TextInput::make('customer_phone')->disabled(),
                TextInput::make('customer_email')->disabled(),
                TextInput::make('participants_count')->disabled(),
            ])->columns(2),

            Section::make('Trip Details')->schema([
                TextInput::make('start_date')->disabled(),
                TextInput::make('end_date')->disabled(),
                TextInput::make('duration_days')->disabled(),
                TextInput::make('meeting_point')->disabled(),
                Textarea::make('notes')->disabled()->columnSpanFull(),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('booking_code')
                    ->searchable()->sortable()->copyable(),
                Tables\Columns\TextColumn::make('customer_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('customer_phone'),
                Tables\Columns\TextColumn::make('tripType.name')
                    ->label('Type')->badge(),
                Tables\Columns\TextColumn::make('destination.name')
                    ->label('Destination')->default('-'),
                Tables\Columns\TextColumn::make('guide.name')
                    ->label('Guide'),
                Tables\Columns\TextColumn::make('start_date')
                    ->date()->sortable(),
                Tables\Columns\TextColumn::make('participants_count')
                    ->label('Pax')->alignCenter(),
                Tables\Columns\TextColumn::make('estimated_total')
                    ->money('IDR')->sortable(),
                Tables\Columns\TextColumn::make('confirmed_total')
                    ->money('IDR')->default('-'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending'   => 'warning',
                        'confirmed' => 'success',
                        'completed' => 'info',
                        'cancelled' => 'danger',
                        default     => 'gray',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')->options([
                    'pending'   => 'Pending',
                    'confirmed' => 'Confirmed',
                    'completed' => 'Completed',
                    'cancelled' => 'Cancelled',
                ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
            'edit'  => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}
