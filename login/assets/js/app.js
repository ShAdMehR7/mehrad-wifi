/*
====================================================

Mehrad Mall WiFi
Version : 1.1.0

Ajax Login

====================================================
*/

const form = document.getElementById("loginForm");

const phoneInput = document.querySelector('input[name="phone"]');
const nationalInput = document.querySelector('input[name="national_code"]');

const phoneError = document.getElementById("phoneError");
const nationalError = document.getElementById("nationalError");

const button = document.getElementById("loginButton");

/* =======================================
   Loading Overlay
======================================= */

const overlay = document.createElement("div");

overlay.id = "loadingOverlay";

overlay.innerHTML = `
<div class="loading-box">

<div class="spinner"></div>

<h2>در حال احراز هویت</h2>

<p>

لطفاً چند لحظه صبر کنید...

</p>

</div>
`;

document.body.appendChild(overlay);

/* =======================================
   Overlay Functions
======================================= */

function showLoading(){

overlay.style.display="flex";

}

function hideLoading(){

overlay.style.display="none";

}

/* =======================================
   Validation
======================================= */

function validatePhone(phone){

return /^09\d{9}$/.test(phone);

}

function validateNationalCode(code){

if(!/^\d{10}$/.test(code))
return false;

if(/^(\d)\1+$/.test(code))
return false;

let sum=0;

for(let i=0;i<9;i++){

sum+=parseInt(code[i])*(10-i);

}

let remainder=sum%11;

let control=parseInt(code[9]);

if(remainder<2){

return control===remainder;

}

return control===11-remainder;

}
/* =======================================
   Live Validation
======================================= */

phoneInput.addEventListener("input", () => {

    phoneInput.value = phoneInput.value.replace(/\D/g, '');

    if (phoneInput.value.length === 0) {

        phoneError.innerHTML = "";
        phoneInput.style.borderColor = "#ddd";
        return;

    }

    if (validatePhone(phoneInput.value)) {

        phoneError.innerHTML = "✅ شماره تماس صحیح است";
        phoneError.style.color = "#4CAF50";
        phoneInput.style.borderColor = "#4CAF50";

    } else {

        phoneError.innerHTML = "شماره تماس معتبر نیست";
        phoneError.style.color = "#ff5252";
        phoneInput.style.borderColor = "#ff5252";

    }

});


nationalInput.addEventListener("input", () => {

    nationalInput.value = nationalInput.value.replace(/\D/g, '');

    if (nationalInput.value.length === 0) {

        nationalError.innerHTML = "";
        nationalInput.style.borderColor = "#ddd";
        return;

    }

    if (validateNationalCode(nationalInput.value)) {

        nationalError.innerHTML = "✅ کد ملی صحیح است";
        nationalError.style.color = "#4CAF50";
        nationalInput.style.borderColor = "#4CAF50";

    } else {

        nationalError.innerHTML = "کد ملی معتبر نیست";
        nationalError.style.color = "#ff5252";
        nationalInput.style.borderColor = "#ff5252";

    }

});


/* =======================================
   Disable Double Click
======================================= */

let sending = false;


/* =======================================
   Ajax Login
======================================= */

form.addEventListener("submit", async function(e){

    e.preventDefault();

    if(sending)
        return;

    if(!validatePhone(phoneInput.value))
        return;

    if(!validateNationalCode(nationalInput.value))
        return;

    sending = true;

    button.disabled = true;

    button.innerHTML = "در حال اتصال...";

    showLoading();

    const formData = new FormData(form);

    try{

        const response = await fetch("./api/auth.php",{

            method:"POST",

            body:formData

        });

        const result = await response.json();
                hideLoading();

        if(result.success){

            button.innerHTML = "✅ ورود موفق";

            button.style.background = "#4CAF50";

            setTimeout(function(){

                alert(result.message);

                /*
                 * نسخه بعد:
                 *
                 * window.location.href = result.redirect;
                 *
                 * یا:
                 *
                 * window.location.href = "/login/success.php";
                 *
                 */

            },500);

        }else{

            button.innerHTML = "ورود به اینترنت";

            button.disabled = false;

            sending = false;

            alert(result.message);

        }

    }catch(error){

        hideLoading();

        button.innerHTML = "ورود به اینترنت";

        button.disabled = false;

        sending = false;

        alert("خطا در ارتباط با سرور");

        console.error(error);

    }

});


/* =======================================
   Initial State
======================================= */

hideLoading();


/* =======================================
   Inject Loading CSS
======================================= */

const style = document.createElement("style");

style.innerHTML = `

#loadingOverlay{

position:fixed;

top:0;

left:0;

right:0;

bottom:0;

display:none;

justify-content:center;

align-items:center;

background:rgba(0,0,0,.45);

backdrop-filter:blur(5px);

z-index:99999;

}

.loading-box{

background:#fff;

padding:35px;

border-radius:20px;

text-align:center;

width:320px;

box-shadow:0 20px 60px rgba(0,0,0,.25);

animation:popup .35s ease;

}

.spinner{

width:55px;

height:55px;

border:5px solid #eee;

border-top:5px solid #0F4C81;

border-radius:50%;

margin:0 auto 20px;

animation:spin 1s linear infinite;

}

.loading-box h2{

margin-bottom:10px;

font-size:22px;

color:#0F4C81;

}

.loading-box p{

color:#666;

font-size:15px;

}

@keyframes spin{

100%{

transform:rotate(360deg);

}

}

@keyframes popup{

from{

opacity:0;

transform:scale(.85);

}

to{

opacity:1;

transform:scale(1);

}

}

`;

document.head.appendChild(style);