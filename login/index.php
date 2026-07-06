<?php
// صفحه اصلی ورود به وای‌فای مهرادمال
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

<div class="page">

    <div class="login-card">

        <div class="logo">

            <img src="assets/img/logo.png" alt="Mehrad Mall">

        </div>

        <h1>شبکه اینترنت مهرادمال</h1>

        <p class="subtitle">

            برای استفاده از اینترنت رایگان، اطلاعات خود را وارد نمایید.

        </p>

        <form id="loginForm" action="auth.php" method="POST">

            <div class="form-group">

                <label>

                    شماره تماس

                </label>

                <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    maxlength="11"
                    placeholder="09123456789"
                    autocomplete="off"
                >

                <small id="mobileError"></small>

            </div>

            <div class="form-group">

                <label>

                    کد ملی

                </label>

                <input
                    type="text"
                    id="nationalCode"
                    name="nationalCode"
                    maxlength="10"
                    placeholder="1234567890"
                    autocomplete="off"
                >

                <small id="nationalError"></small>

            </div>

            <button type="submit">

                ورود به اینترنت

            </button>

        </form>

        <div class="footer">

            با ورود به سامانه، قوانین استفاده از اینترنت مهرادمال را می‌پذیرم.

        </div>

    </div>

</div>

<script src="assets/js/app.js"></script>

</body>

</html>