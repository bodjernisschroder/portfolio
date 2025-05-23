const buttonOne = document.getElementById("generateButton");
const buttonTwo = document.getElementById("copyButton");
const outputSection = document.querySelector('.output');

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const special = "!@#$%^&*-+_?/<>{}[]()~`|";

const isUpperCaseChecked = document.getElementById("uppercase");
const isLowerCaseChecked = document.getElementById("lowercase");
const isNumbersChecked = document.getElementById("numbers");
const isSpecialChecked = document.getElementById("special");
const passwordLength = document.getElementById("passwordLength");

let password = [];

let count = 0;

buttonOne.addEventListener('click', function(){
    password = [];
    generatePassword();
    randomizePassword();
    outputSection.textContent = password.join("");
    count = 0;
});

passwordLength.addEventListener('input', function(){
    let length = document.getElementById("length");
    length.textContent = passwordLength.value;
});



function generatePassword(){
    for (let i = 0; i < passwordLength.value; i++) {
        if (isUpperCaseChecked.checked && count<passwordLength.value) {
            password.push(uppercase[Math.floor(Math.random()*uppercase.length)]);
            count++;
        }
        if (isLowerCaseChecked.checked && count<passwordLength.value) {
            password.push(lowercase[Math.floor(Math.random()*lowercase.length)]);
            count++;
        }
        if (isNumbersChecked.checked && count<passwordLength.value) {
            password.push(numbers[Math.floor(Math.random()*numbers.length)]);
            count++;
        }
        if (isSpecialChecked.checked && count<passwordLength.value)  {
            password.push(special[Math.floor(Math.random()*special.length)]);
            count++;
        }
        
    }
    return password.join("");
}

function randomizePassword(){
    password.sort(() => Math.random() - 0.5);
}

function copyText (){
    let copy = document.querySelector('.output');
    navigator.clipboard.writeText(copy.textContent);
    alert("Password copied to clipboard!");
}
