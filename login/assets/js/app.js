/*
====================================================

Mehrad Mall WiFi

Version 1.3

====================================================
*/


const form = document.getElementById("loginForm");

const phone = document.querySelector('input[name="phone"]');

const national = document.querySelector('input[name="national_code"]');

const loginButton = document.getElementById("loginButton");

const phoneError = document.getElementById("phoneError");

const nationalError = document.getElementById("nationalError");


const overlay = document.getElementById("progressOverlay");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressPercent");

const progressTitle = document.getElementById("progressTitle");


let working = false;


/* =====================================

Progress

===================================== */

function showProgress(){

overlay.style.display="flex";

}


function hideProgress(){

overlay.style.display="none";

progressBar.style.width="0%";

progressText.innerHTML="0%";

}


function setProgress(percent,title){

progressBar.style.width=percent+"%";

progressText.innerHTML=percent+"%";

progressTitle.innerHTML=title;

}


/* =====================================

Toast

===================================== */

function toast(message,type="success"){

const div=document.createElement("div");

div.className="toast "+type;

div.innerHTML=

(type==="success" ? "✅ " : "❌ ")

+message;

document.body.appendChild(div);

setTimeout(()=>{

div.classList.add("show");

},50);

setTimeout(()=>{

div.classList.remove("show");

setTimeout(()=>{

div.remove();

},300);

},2500);

}


/* =====================================

Validation

===================================== */

function validatePhone(value){

return /^09\d{9}$/.test(value);

}


function validateNational(value){

if(!/^\d{10}$/.test(value))

return false;

if(/^(\d)\1+$/.test(value))

return false;

let sum=0;

for(let i=0;i<9;i++){

sum+=parseInt(value[i])*(10-i);

}

let remain=sum%11;

let control=parseInt(value[9]);

if(remain<2)

return control===remain;

return control===11-remain;

}
/* =====================================

Live Validation

===================================== */

phone.addEventListener("input",()=>{

phone.value=phone.value.replace(/\D/g,"");

if(phone.value===""){

phone.style.borderColor="#dbe5f1";

phoneError.innerHTML="";

return;

}

if(validatePhone(phone.value)){

phone.style.borderColor="#2E7D32";

phoneError.style.color="#2E7D32";

phoneError.innerHTML="✔ شماره تماس صحیح است";

}else{

phone.style.borderColor="#C62828";

phoneError.style.color="#C62828";

phoneError.innerHTML="شماره تماس معتبر نیست";

}

});


national.addEventListener("input",()=>{

national.value=national.value.replace(/\D/g,"");

if(national.value===""){

national.style.borderColor="#dbe5f1";

nationalError.innerHTML="";

return;

}

if(validateNational(national.value)){

national.style.borderColor="#2E7D32";

nationalError.style.color="#2E7D32";

nationalError.innerHTML="✔ کد ملی صحیح است";

}else{

national.style.borderColor="#C62828";

nationalError.style.color="#C62828";

nationalError.innerHTML="کد ملی معتبر نیست";

}

});


/* =====================================

Login Submit

===================================== */

form.addEventListener("submit",async function(e){

e.preventDefault();

if(working)

return;

if(!validatePhone(phone.value)){

toast("شماره تماس صحیح نیست","error");

return;

}

if(!validateNational(national.value)){

toast("کد ملی معتبر نیست","error");

return;

}

working=true;

loginButton.disabled=true;

loginButton.innerHTML="در حال بررسی...";

showProgress();

setProgress(

10,

"در حال بررسی اطلاعات..."

);

await delay(500);

setProgress(

25,

"اعتبارسنجی اطلاعات..."

);

await delay(500);

const formData=new FormData(form);

formData.append(

"phone",

phone.value

);

formData.append(

"national_code",

national.value

);

try{

setProgress(

40,

"اتصال به سرور..."

);

const response=await fetch(

"./api/auth.php",

{

method:"POST",

body:formData

}

);

setProgress(

60,

"دریافت پاسخ سرور..."

);

const result=await response.json();
/* =====================================

Server Response

===================================== */

        if(result.success){

            setProgress(

                80,

                "بررسی اطلاعات کاربر..."

            );

            await delay(600);

            setProgress(

                100,

                "ورود با موفقیت انجام شد"

            );

            loginButton.innerHTML="✔ ورود موفق";

            loginButton.style.background="#2E7D32";

            toast(result.message,"success");

            /*
             * نسخه بعدی:
             *
             * window.location.href=result.redirect;
             *
             */

            setTimeout(()=>{

                hideProgress();

            },1200);

        }else{

            hideProgress();

            toast(result.message,"error");

            loginButton.innerHTML="ورود به اینترنت";

            loginButton.disabled=false;

            working=false;

        }

    }catch(error){

        console.error(error);

        hideProgress();

        toast(

            "ارتباط با سرور برقرار نشد",

            "error"

        );

        loginButton.innerHTML="ورود به اینترنت";

        loginButton.disabled=false;

        working=false;

    }

});


/* =====================================

Delay

===================================== */

function delay(ms){

return new Promise(resolve=>{

setTimeout(resolve,ms);

});

}
/* =====================================

Reset Form

===================================== */

function resetForm(){

phone.value="";

national.value="";

phoneError.innerHTML="";

nationalError.innerHTML="";

phone.style.borderColor="#dbe5f1";

national.style.borderColor="#dbe5f1";

loginButton.innerHTML="ورود به اینترنت";

loginButton.style.background="";

loginButton.disabled=false;

working=false;

phone.focus();

}


/* =====================================

Future Hooks

===================================== */

/*
این توابع در نسخه‌های بعدی تکمیل می‌شوند.
فعلاً فقط ساختار پروژه را آماده می‌کنند.
*/

async function loadMemberInformation(member){

    console.log("Member :",member);

}

async function radiusLogin(member){

    console.log("Radius Login");

}

async function mikrotikLogin(member){

    console.log("MikroTik Login");

}


/* =====================================

Initialization

===================================== */

window.addEventListener("load",()=>{

hideProgress();

phone.focus();

});


/* =====================================

Enter Key Navigation

===================================== */

phone.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

e.preventDefault();

national.focus();

}

});


national.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

e.preventDefault();

form.requestSubmit();

}

});


/* =====================================

Auto Reset After Success

===================================== */

setInterval(()=>{

if(!working){

loginButton.disabled=false;

}

},1000);