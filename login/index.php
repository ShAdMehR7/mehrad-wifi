<?php
/*
|--------------------------------------------------------------------------
| Mehrad Mall WiFi
|--------------------------------------------------------------------------
| Version : 1.0.1
|--------------------------------------------------------------------------
*/
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Mehrad Mall WiFi</title>

<link rel="stylesheet" href="assets/css/style.css">

</head>

<body>

<div class="background">

<div class="circle c1"></div>
<div class="circle c2"></div>
<div class="circle c3"></div>

</div>

<div class="login-card">

<div class="logo">

<img src="assets/img/logo.png" alt="Mehrad Mall">

</div>

<h1>اینترنت رایگان مهرادمال</h1>

<p class="subtitle">

ویژه اعضای باشگاه مشتریان

</p>

<form action="auth.php" method="POST">

<div class="input-group">

<label>

📱 شماره تماس

</label>

<input
type="text"
name="phone"
placeholder="0912xxxxxxx"
maxlength="11"
autocomplete="off"
>

<small id="phoneError"></small>

</div>

<div class="input-group">

<label>

🪪 کد ملی

</label>

<input
type="text"
name="national_code"
placeholder="**********"
maxlength="10"
autocomplete="off"
>

<small id="nationalError"></small>

</div>

<button type="submit">

ورود به اینترنت

</button>

</form>

<div class="footer">

اینترنت رایگان ویژه اعضای باشگاه مشتریان مهرادمال

<br>

© 2026 Mehrad Mall

</div>

</div>

<script src="assets/js/app.js"></script>

</body>

</html>