<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../../includes/radius_helper.php';

$config = require __DIR__ . '/../../config/config.php';

$phone = $_POST['phoneNumber'] ?? '';
$password = $_POST['nationalCode'] ?? '';

$phone = $_POST['phoneNumber'] ?? '';

if ($phone == '') {

    http_response_code(400);

    echo json_encode([
        'status' => 400,
        'message' => 'Missing phoneNumber'
    ]);

    exit;
} 
// if ($phone == '' || $password == '') {

//     http_response_code(400);

//     echo json_encode([
//         'status' => 400,
//         'message' => 'Missing phoneNumber or nationalCode'
//     ]);

//     exit;
// }

$clubApi = $config['club_api']['url'];

$postData = http_build_query([
    'phoneNumber' => $phone
]);

// $postData = http_build_query([
//     'phoneNumber' => $phone,
//     'nationalCode' => $password
// ]);

$ch = curl_init($clubApi);

curl_setopt_array($ch, [

    CURLOPT_RETURNTRANSFER => true,

    CURLOPT_POST => true,

    CURLOPT_POSTFIELDS => $postData,

    CURLOPT_TIMEOUT => $config['club_api']['timeout']

]);

$response = curl_exec($ch);

if (curl_errno($ch)) {

    echo json_encode([
        'status' => 500,
        'message' => curl_error($ch)
    ]);

    exit;
}

curl_close($ch);


$clubResponse = json_decode($response, true);


if (!$clubResponse) {

    echo json_encode([
        'status' => 500,
        'message' => 'Invalid JSON received from Club API'
    ]);

    exit;
}

$radiusResponse = buildRadiusResponse($clubResponse);

echo json_encode($radiusResponse, JSON_PRETTY_PRINT);