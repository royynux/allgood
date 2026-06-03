<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\DestinationController;
use App\Http\Controllers\Api\GuideController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Support\Facades\Route;

Route::get('/destinations', [DestinationController::class, 'index']);
Route::get('/destinations/{destination:slug}', [DestinationController::class, 'show']);
Route::get('/destinations/{destination:slug}/reviews', [ReviewController::class, 'index']);

Route::get('/guides', [GuideController::class, 'index']);
Route::get('/guides/{guide}', [GuideController::class, 'show']);

Route::get('/settings', [ContentController::class, 'settings']);
Route::get('/team-members', [ContentController::class, 'team']);
Route::get('/gallery', [ContentController::class, 'gallery']);
Route::get('/testimonials', [ContentController::class, 'testimonials']);

Route::post('/payments/notification', [PaymentController::class, 'notification']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::post('/payments/snap-token', [PaymentController::class, 'snapToken']);
    Route::post('/payments/confirm', [PaymentController::class, 'confirm']);
});
