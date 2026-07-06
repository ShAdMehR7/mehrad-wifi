/*
====================================================

Mehrad Mall WiFi
Version : 1.0.2

====================================================
*/

const phoneInput = document.querySelector('input[name="phone"]');
const nationalInput = document.querySelector('input[name="national_code"]');

const phoneError = document.getElementById("phoneError");
const nationalError = document.getElementById("nationalError");

const form = document.querySelector("form");
const button = document.querySelector("button");

/* ---------------------------- */

function validatePhone(phone){

    return /^09\d{9}$/.test(phone);

}

/* ---------------------------- */

function validateNationalCode(code){

    if(!/^\d{10}$/.test(code))
        return false;

    if(/^(\d)\1+$/.test(code))
        return false;

    let sum=0;

    for(let i=0;i<9;i++){

        sum += parseInt(code[i])*(10-i);

    }

    let remainder=sum%11;

    let control=parseInt(code[9]);

    if(remainder<2)
        return control===remainder;

    return control===(11-remainder);

}

/* ---------------------------- */

phoneInput.addEventListener("input",()=>{

    phoneInput.value=phoneInput.value.replace(/\D/g,'');

    if(phoneInput.value.length===0){

        phoneError.innerHTML="";
        phoneInput.style.borderColor="#ddd";

        return;

    }

    if(validatePhone(phoneInput.value)){

        phoneError.innerHTML="✅ شماره تماس صحیح است";

        phoneError.style.color="#4CAF50";

        phoneInput.style.borderColor="#4CAF50";

    }else{

        phoneError.innerHTML="شماره تماس معتبر نیست";

        phoneError.style.color="#ff5252";

        phoneInput.style.borderColor="#ff5252";

    }

});

/* ---------------------------- */

nationalInput.addEventListener("input",()=>{

    nationalInput.value=nationalInput.value.replace(/\D/g,'');

    if(nationalInput.value.length===0){

        nationalError.innerHTML="";
        nationalInput.style.borderColor="#ddd";

        return;

    }

    if(validateNationalCode(nationalInput.value)){

        nationalError.innerHTML="✅ کد ملی صحیح است";

        nationalError.style.color="#4CAF50";

        nationalInput.style.borderColor="#4CAF50";

    }else{

        nationalError.innerHTML="کد ملی معتبر نیست";

        nationalError.style.color="#ff5252";

        nationalInput.style.borderColor="#ff5252";

    }

});

/* ---------------------------- */

form.addEventListener("submit",(e)=>{

    if(!validatePhone(phoneInput.value) || !validateNationalCode(nationalInput.value)){

        e.preventDefault();

        return;

    }

    button.disabled=true;

    button.innerHTML="در حال اتصال ...";

});