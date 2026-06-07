<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://allgoodadventure.site',
        'https://www.allgoodadventure.site',
    ],

    'allowed_origins_patterns' => [
        '#^http://(localhost|127\.0\.0\.1|192\.168\.56\.1)(:\d+)?$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
