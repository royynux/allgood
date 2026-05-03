<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    protected $fillable = [
        'destination_id',
        'reviewer_name',
        'rating',
        'comment',
        'trip_date',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'trip_date' => 'date',
            'is_published' => 'boolean',
        ];
    }

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }
}
