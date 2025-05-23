let laughSound = new Audio('sounds/laugh.mp3');

let value = 0;

let userInputOne = 0;
let userInputTwo = 0;
let operator = "";

document.getElementById('display').innerHTML = value.toString();

function backspace() {
    if(value.length == 1){
        value = 0;
        document.getElementById('display').innerHTML = value.toString();
    } else if (value == 0){
        document.getElementById('display').innerHTML = value.toString();
    } else {
        value = value.toString().split('').slice(0, -1).join('');
        document.getElementById('display').innerHTML = value.toString();
    } 
}

function clearDisplay(){
    value = 0;
    document.getElementById('display').innerHTML = value.toString();
}

function addDigit(digit){
    if(value == 0){
        value = digit.toString();
        document.getElementById('display').innerHTML = value;
    } else {
        value = value.toString() + digit.toString();
    document.getElementById('display').innerHTML = value;
    }
    
}

function period(){
    if(!value.includes(".") && value != 0){
        value = value.toString() + ".";
        document.getElementById('display').innerHTML = value;
    }
    
}

function add(){
    userInputOne = value;
    operator = "+";
    value = 0;
    document.getElementById('display').innerHTML = operator.toString();
}

function subtract(){
    userInputOne = value;
    operator = "-";
    value = 0;
    document.getElementById('display').innerHTML = operator.toString();
}

function multiply(){
    userInputOne = value;
    operator = "*";
    value = 0;
    document.getElementById('display').innerHTML = operator.toString();
}   

function divide(){
    userInputOne = value;
    operator = "/";
    value = 0;
    document.getElementById('display').innerHTML = operator.toString();
}

function equals(){
    userInputTwo = value;

    const num1 = parseFloat(userInputOne);
    const num2 = parseFloat(userInputTwo);

    if (operator == "+"){
        value = (num1 + num2).toFixed(5);
        document.getElementById('display').innerHTML = parseFloat(value).toString();
    } else if (operator == "-"){
        value = (num1 - num2).toFixed(5);
        document.getElementById('display').innerHTML = parseFloat(value).toString();
    } else if (operator == "*"){
        value = (num1 * num2).toFixed(5);
        document.getElementById('display').innerHTML = parseFloat(value).toString();
    } else if (operator == "/"){
        value = (num1 / num2).toFixed(5);
        document.getElementById('display').innerHTML = parseFloat(value).toString();
    }
}

function smiley(){
    laughSound.play();
}





