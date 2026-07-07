<?php

return [

    'VIP-profile' => [
        'rate_limit'      => '20M/20M',
        'session_timeout' => 86400,
        'quota'           => 100000,
    ],

    'Admin-profile' => [
        'rate_limit'      => '100M/100M',
        'session_timeout' => 86400,
        'quota'           => 999999,
    ],

    'Dimend-profile' => [
        'rate_limit'      => '4M/1M',
        'session_timeout' => 43200,
        'quota'           => 5000,
    ],

    'Gold-profile' => [
        'rate_limit'      => '8M/2M',
        'session_timeout' => 43200,
        'quota'           => 8000,
    ],

    'Silver-profile' => [
        'rate_limit'      => '4M/1M',
        'session_timeout' => 21600,
        'quota'           => 4000,
    ],

    'Bronz-profile' => [
        'rate_limit'      => '2M/512k',
        'session_timeout' => 10800,
        'quota'           => 2000,
    ],

];