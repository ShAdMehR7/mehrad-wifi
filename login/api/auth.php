<?php

header('Content-Type: application/json; charset=utf-8');

file_put_contents(
    __DIR__ . "/../logs/auth_debug.log",
    date("Y-m-d H:i:s") . " auth.php executed\n",
    FILE_APPEND
);

$config = require __DIR__ . '/../config/config.php';

$phone = trim($_POST['phone'] ?? '');
$national = trim($_POST['national_code'] ?? '');

if ($phone == '' || $national == '') {

    echo json_encode([

    "success" => true,

    "phone" => $data['phone'],

    "cleartext_password" => $data['cleartext_password'],

    "profile" => $data['profile'],

    "message" => "ورود موفق"

]);

exit;
}

$ch = curl_init();

curl_setopt_array($ch, [

    CURLOPT_URL => $config['club_api']['url'],

    CURLOPT_RETURNTRANSFER => true,

    CURLOPT_POST => true,

    CURLOPT_TIMEOUT => $config['club_api']['timeout'],

    CURLOPT_POSTFIELDS => [

        'phoneNumber' => $phone,

        'nationalCode' => $national

    ]

]);

$response = curl_exec($ch);

$error = curl_error($ch);

curl_close($ch);

if ($error) {

    echo json_encode([
        'success' => false,
        'message' => 'ارتباط با API برقرار نشد.'
    ]);

    exit;
}

$data = json_decode($response, true);

if (!$data) {

    echo json_encode([
        'success' => false,
        'message' => 'پاسخ API معتبر نیست.'
    ]);

    exit;
}

if (($data['status'] ?? 500) == 200) {
    //echo "<pre>";
//print_r($data);
//exit;
//     echo json_encode($data, JSON_PRETTY_PRINT);
// exit;

/*
|--------------------------------------------------------------------------
| ساخت فایل Cache
|--------------------------------------------------------------------------
*/

$cache = [

    'phone' => $data['phone'],

    'cleartext_password' => $data['cleartext_password'],

    'profile' => $data['profile'],

    'created_at' => time(),

    'expire_at' => time() + 3600

];
$file = __DIR__ . '/../cache/' . $data['phone'] . '.json';

$result = file_put_contents(
    $file,
    json_encode($cache, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

echo json_encode([
    "success" => true,
    "file"    => $file,
    "written" => $result,
    "exists"  => file_exists($file),
    "message" => "TEST"
]);

exit;
//file_put_contents(

  //  __DIR__ . '/../cache/' . $data['phone'] . '.json',

    //json_encode($cache, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)

//);
    echo json_encode([

        'success' => true,

        'message' => $data['reply_message'] ?? 'ورود موفق',

        'radius' => $data

    ]);

} else {

    echo json_encode([

        'success' => false,

        'message' => $data['reply_message'] ?? 'کاربر یافت نشد'

    ]);

}
