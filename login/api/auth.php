<?php

require_once __DIR__ . '/../includes/response.php';

$phone = trim($_POST['phone'] ?? '');
$national = trim($_POST['national_code'] ?? '');

if ($phone == '' || $national == '') {

    jsonResponse(false, 'تمام فیلدها الزامی است.');

}

sleep(2);

jsonResponse(true, 'اطلاعات دریافت شد.', [

    'phone' => $phone,

    'national_code' => $national

]);