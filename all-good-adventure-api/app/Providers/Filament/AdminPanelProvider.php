<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Support\Icons\Heroicon;
use Filament\View\PanelsIconAlias;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\HtmlString;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandName('All Good Adventure')
            ->brandLogoHeight('2rem')
            ->font('Plus Jakarta Sans', url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap')
            ->icons([
                PanelsIconAlias::PAGES_DASHBOARD_NAVIGATION_ITEM => Heroicon::OutlinedHome,
            ])
            ->colors([
                'primary' => Color::hex('#E8490F'),
                'gray' => Color::Slate,
                'info' => Color::Sky,
                'success' => Color::Emerald,
                'warning' => Color::Amber,
                'danger' => Color::Red,
            ])
            ->renderHook(
                PanelsRenderHook::STYLES_AFTER,
                fn (): HtmlString => new HtmlString('<link rel="stylesheet" href="' . asset('css/aga-filament-admin.css') . '">'),
            )
            ->renderHook(
                PanelsRenderHook::PAGE_HEADER_WIDGETS_BEFORE,
                fn (): HtmlString => new HtmlString(<<<'HTML'
                    <div class="aga-dashboard-ribbon">
                        <div class="aga-dashboard-ribbon__inner">
                            <div class="aga-dashboard-ribbon__eyebrow">Private Trip Operations</div>
                            <div class="aga-dashboard-ribbon__title">All Good Adventure Command Center</div>
                            <div class="aga-dashboard-ribbon__text">Monitor departures, custom trip pricing, guides, destinations, and booking activity from one focused workspace.</div>
                        </div>
                    </div>
                HTML),
                Dashboard::class,
            )
            ->renderHook(
                PanelsRenderHook::SIDEBAR_FOOTER,
                fn (): HtmlString => new HtmlString(<<<'HTML'
                    <div class="aga-sidebar-footer">
                        <strong>AGA Admin</strong>
                        Guide included pricing, Rinjani fixed 3D2N, and custom trip confirmation queue.
                    </div>
                HTML),
            )
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
                FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
