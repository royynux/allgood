<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryPhoto;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    public function settings()
    {
        $raw = SiteSetting::all()->pluck('value', 'key');

        $settings = [];
        foreach ($raw as $key => $value) {
            $decoded = json_decode($value, true);
            $settings[$key] = $decoded !== null ? $decoded : $value;
        }

        return response()->json(['data' => $settings]);
    }

    public function team()
    {
        $members = TeamMember::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn ($m) => [
                'id'          => $m->id,
                'name'        => $m->name,
                'role'        => $m->role,
                'bio'         => $m->bio,
                'avatar'      => $m->avatar
                    ? (str_starts_with($m->avatar, 'http') ? $m->avatar : url(Storage::url($m->avatar)))
                    : null,
                'cover_image' => $m->cover_image
                    ? (str_starts_with($m->cover_image, 'http') ? $m->cover_image : url(Storage::url($m->cover_image)))
                    : null,
            ]);

        return response()->json(['data' => $members]);
    }

    public function gallery()
    {
        $photos = GalleryPhoto::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn ($p) => [
                'id'      => $p->id,
                'image'   => $p->image
                    ? (str_starts_with($p->image, 'http') ? $p->image : url(Storage::url($p->image)))
                    : null,
                'caption' => $p->caption,
            ]);

        return response()->json(['data' => $photos]);
    }

    public function testimonials()
    {
        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn ($t) => [
                'id'              => $t->id,
                'reviewer_name'   => $t->reviewer_name,
                'reviewer_role'   => $t->reviewer_role,
                'reviewer_avatar' => $t->reviewer_avatar
                    ? (str_starts_with($t->reviewer_avatar, 'http') ? $t->reviewer_avatar : url(Storage::url($t->reviewer_avatar)))
                    : null,
                'rating'          => $t->rating,
                'comment'         => $t->comment,
            ]);

        return response()->json(['data' => $testimonials]);
    }
}
