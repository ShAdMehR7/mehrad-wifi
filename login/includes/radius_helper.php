<?php

$profileMapper = require __DIR__ . '/../config/profile_mapper.php';


/**
 * تبدیل پاسخ API باشگاه به پاسخ قابل استفاده برای FreeRADIUS
 *
 * @param array $clubResponse
 * @return array
 */
function buildRadiusResponse(array $clubResponse): array
{
    global $profileMapper;

    // بررسی معتبر بودن پاسخ
    if (
        !isset($clubResponse['status']) ||
        $clubResponse['status'] != 200
    ) {

        return [
            'status' => 401,
            'message' => 'User not found'
        ];
    }
    file_put_contents(
    __DIR__ . '/../logs/profile_debug.log',
    print_r($clubResponse, true)
);

    $profile = $clubResponse['profile'];
    if (!isset($profileMapper[$profile])) {

        return [
            'status' => 500,
            'message' => 'Unknown profile'
        ];
    }

    $profileConfig = $profileMapper[$profile];

    return [

    'control:Cleartext-Password' =>
        $clubResponse['cleartext_password'],

    // برای استفاده در صفحه Login
    'cleartext_password' =>
        $clubResponse['cleartext_password'],

    'reply:Mikrotik-Rate-Limit' =>
        $profileConfig['rate_limit'],

    'reply:Session-Timeout' =>
        $profileConfig['session_timeout'],

    'reply:Reply-Message' =>
        'Welcome to MehradMall',

    'profile' =>
        $profile,

    'quota' =>
        $profileConfig['quota'],

    'phone' =>
        $clubResponse['phone'],

    'status' =>
        200
];
}