<?php

$config = require __DIR__.'/config/config.php';

?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>

<meta charset="UTF-8">

<title>MehradMall WiFi</title>

<link rel="stylesheet" href="assets/css/style.css">

</head>

<body>

<div class="login-box">

<h1>MehradMall WiFi</h1>

<form action="auth.php" method="post">

<label>

شماره همراه

</label>

<input
type="text"
name="phoneNumber"
placeholder="0912xxxxxxx"
required>

<label>

کد ملی

</label>

<input
type="password"
name="nationalCode"
required>

<button type="submit">

اتصال به اینترنت

</button>

</form>

</div>

</body>

</html>