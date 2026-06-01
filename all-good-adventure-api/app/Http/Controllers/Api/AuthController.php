<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
        } catch (\Exception $e) {
            $frontendUrl = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');
            $msg = urlencode($e->getMessage());
            return redirect("{$frontendUrl}/auth/login?error=google_failed&detail={$msg}");
        }

        $userData = [
            'name' => $googleUser->getName(),
            'google_id' => $googleUser->getId(),
            'avatar' => $googleUser->getAvatar(),
            'email_verified_at' => now(),
            'role' => 'user',
        ];

        $user = User::where('email', $googleUser->getEmail())->first();

        if ($user) {
            $user->update($userData);
        } else {
            $user = User::create(array_merge(
                ['email' => $googleUser->getEmail(), 'password' => Str::random(40)],
                $userData,
            ));
        }

        $user->tokens()->where('name', 'google-auth')->delete();
        $token = $user->createToken('google-auth')->plainTextToken;

        $frontendUrl = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');
        $params = http_build_query([
            'token'  => $token,
            'id'     => $user->id,
            'name'   => $user->name,
            'email'  => $user->email,
            'avatar' => $user->avatar ?? '',
        ]);

        return redirect("{$frontendUrl}/auth/callback?{$params}");
    }

    public function me(Request $request)
    {
        return response()->json([
            'data' => $request->user()->only(['id', 'name', 'email', 'avatar', 'role']),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
