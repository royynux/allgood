<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GuideCertification extends Model
{
    protected $fillable = [
        'guide_id',
        'name',
    ];

    public function guide(): BelongsTo
    {
        return $this->belongsTo(Guide::class);
    }
}
