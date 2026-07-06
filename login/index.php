<?php
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width,initial-scale=1.0">

<title>

Mehrad Mall WiFi

</title>

<link rel="stylesheet"
href="assets/css/style.css">

</head>

<body>

<div class="background"></div>

<div class="login-card">

<div class="logo">

<img
src="assets/img/logo.png"
alt="Mehrad Mall">

</div>

<h1>

Mehrad Mall WiFi

</h1>

<p>

برای استفاده از اینترنت ابتدا وارد شوید

</p>

<form id="loginForm">

<div class="input-group">

<label>

📱 شماره تماس

</label>

<input

type="text"

name="phone"

maxlength="11"

autocomplete="off"

placeholder="0912xxxxxxx"

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

maxlength="10"

autocomplete="off"

placeholder="**********"

>

<small id="nationalError"></small>

</div>

<button
id="loginButton"
type="submit">

ورود به اینترنت

</button>

</form>

</div>

<div id="progressOverlay">

<div class="progress-card">

<h2 id="progressTitle">

در حال بررسی اطلاعات...

</h2>

<div class="progress">

<div
id="progressBar">

</div>

</div>

<p id="progressPercent">

0%

</p>

</div>

</div>

<script src="assets/js/app.js"></script>

</body>

</html>