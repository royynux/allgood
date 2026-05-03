<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->string('badge')->nullable()->after('tags');
            $table->json('includes')->nullable()->after('badge');
            $table->json('excludes')->nullable()->after('includes');
            $table->json('meeting_points')->nullable()->after('excludes');
        });
    }

    public function down(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn(['badge', 'includes', 'excludes', 'meeting_points']);
        });
    }
};
