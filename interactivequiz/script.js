let correctSound = new Audio("sounds/correct-choice.mp3");
let wrongSound = new Audio("sounds/wrong.mp3");
let timerSound = new Audio("sounds/timer.mp3");
let letsplaySound = new Audio("sounds/letsplay.mp3");

import { questionArr, correctAnswer, wrongAnswer } from './quizarrays.js';

document.getElementById('startButton').addEventListener('click', startQuiz);
document.getElementById('optionButton1').addEventListener('click', button1);
document.getElementById('optionButton2').addEventListener('click', button2);
document.getElementById('resetQuizButton').addEventListener('click', resetQuiz);

document.getElementById("scoreDisplay").style.cssText = `display: none;`;
correctSound.volume = 0.2;
wrongSound.volume = 0.2;
timerSound.volume = 0.2;
letsplaySound.volume = 0.2;

let isLeaderboardBeingPopulated = false;
populateLeaderboardTable();

let questionNumber = Math.floor(Math.random()*questionArr.length);
let isGameRunning = false;
let activeButtons = false;

function startQuiz() {

    if(!isGameRunning){
    isGameRunning = true;
    document.getElementById("resetQuizButton").style.cssText = `display: none;`;
    

    let username = document.getElementById("username").value;
    //let topic = document.getElementById("chooseCategory").value;

    if (username == "") {
        document.getElementById("currentScore").innerHTML = "Please enter your name to start the quiz.";
        isGameRunning = false;
    } else {
        document.getElementById("scoreDisplay").style.cssText = `display: flex;`;
        progressBarWidth = document.getElementById("scoreDisplay").offsetWidth;
        document.getElementById("section2").style.cssText = `display: flex;`;
        document.getElementById("questionDisplay").style.cssText = `display: flex;`;
        document.getElementById("scoreCounter").style.cssText = `display: flex;`;
        document.getElementById("section3").style.cssText = `display: none;`;
        document.getElementById("section1").style.cssText = `display: none;`;
        document.getElementById("currentScore").innerHTML = "Score: 0";
        letsplaySound.play();
        activeButtons = false;
         setTimeout(function(){
            questionDisplay(); 
            startTimer();
        }, 4000);
    }
    } else {
        document.getElementById("currentScore").innerHTML = `Score: ${scoreCounter}. The quiz is already running.`;
    }

    
}

window.startQuiz = startQuiz;

function buttonOneCorrect(){
    document.getElementById("optionButton1").style.cssText = `background-color: green;`;
}

function buttonTwoCorrect(){
    document.getElementById("optionButton2").style.cssText = `background-color: green;`;
}

function buttonOneWrong(){
    document.getElementById("optionButton1").style.cssText = `background-color: #d32e2e;`;
}

function buttonTwoWrong(){
    document.getElementById("optionButton2").style.cssText = `background-color: #d32e2e;`;
}




//This bit of code is for the score counter, it increments by 1 every time a question is answered correctly.
let scoreCounter = 0;

function scoreTicker(){
    scoreCounter += 1;
    document.getElementById("currentScore").innerHTML = "Score: " + scoreCounter;
}

//This bit of code is for the question timer
let progressBarWidth = scoreDisplay.offsetWidth;
let accumulate = 0

function questionTimer(){

    
    
    let progressBar = (progressBarWidth/1000) + accumulate;

    if (progressBar <= progressBarWidth){
        document.getElementById("scoreDisplay").style.cssText = `border-right: ${progressBar}px solid white;`
        accumulate += progressBarWidth/1000;
    } else if (progressBar > progressBarWidth){
        progressBar = progressBarWidth;
        timerSound.load();
        wrongSound.play();
        gameOver();

    }
    
}

//This bit of code is for the question timer to start when the button is clicked

let timerInterval;
let isTimerRunning = false;

function startTimer(){

    timerSound.play();
    if(accumulate < progressBarWidth && !isTimerRunning){
        isTimerRunning = true;
        timerInterval = setInterval(questionTimer, 10);
    }
}

//This bit populates the display with the question and options.


let randomNumber = Math.floor(Math.random()*10);

let questionUsed = [];

function questionDisplay(){

    document.getElementById("optionButton1").style.cssText = `background-color: #04AA6D;`;
    document.getElementById("optionButton2").style.cssText = `background-color: #04AA6D;`;

    if(questionUsed.includes(questionNumber)){
        questionNumber = Math.floor(Math.random()*questionArr.length);
        questionDisplay();
    } else{
        document.getElementById("questionDisplay").innerHTML = questionArr[questionNumber];
        questionUsed.push(questionNumber);
    }
    if(randomNumber < 5){
        document.getElementById("optionButton1").innerHTML = correctAnswer[questionNumber];
        document.getElementById("optionButton2").innerHTML = wrongAnswer[questionNumber];
        randomNumber = Math.floor(Math.random()*10);
    } else if (randomNumber >= 5){
        document.getElementById("optionButton2").innerHTML = correctAnswer[questionNumber];
        document.getElementById("optionButton1").innerHTML = wrongAnswer[questionNumber];
        randomNumber = Math.floor(Math.random()*10);
    }
    activeButtons = true;
    
}



function button1(){
    if(isGameRunning && activeButtons){
        option1();
    } 
}
function button2(){
    if(isGameRunning && activeButtons){
        option2();
    }
}


function option1(){
    
    

    if (document.getElementById("optionButton1").innerHTML == correctAnswer[questionNumber]){
        scoreTicker();
        buttonOneCorrect();
        timerSound.load();
        correctSound.play();
        questionNumber = Math.floor(Math.random()*questionArr.length);
        clearInterval(timerInterval);
        isTimerRunning = false;
        accumulate = 0;
        activeButtons = false;

        setTimeout(function(){
            questionDisplay();
            startTimer();
        }, 1000);
        
    } else {
        buttonOneWrong();
        timerSound.load();
        wrongSound.play();
        gameOver();
    }
     
}

function option2(){
    
    if (document.getElementById("optionButton2").innerHTML == correctAnswer[questionNumber]){
        scoreTicker();
        buttonTwoCorrect();
        timerSound.load();
        correctSound.play();
        questionNumber = Math.floor(Math.random()*questionArr.length);
        clearInterval(timerInterval);
        isTimerRunning = false;
        accumulate = 0;
        activeButtons = false;

        setTimeout(function(){
            questionDisplay();
            startTimer();
        }, 1000);

    } else {
        buttonTwoWrong();
        timerSound.load();
        wrongSound.play();
        gameOver();
    }
     
}

function resetQuiz(){
    document.getElementById("optionButton1").style.cssText = `background-color: #04AA6D;`;
    document.getElementById("optionButton2").style.cssText = `background-color: #04AA6D;`;
    clearInterval(timerInterval);
    isTimerRunning = false;
    isResultsBeingStored = false;
    isLeaderboardBeingPopulated = false;
    populateLeaderboardTable();
    accumulate = 0;
    scoreCounter = 0;
    questionNumber = Math.floor(Math.random()*questionArr.length); 
    document.getElementById("username").value = "";
    //document.getElementById("chooseCategory").value = "";
    document.getElementById("scoreDisplay").style.cssText = `border-right: 0px solid white;`;
    document.getElementById("currentScore").innerHTML = "Score: 0";
    document.getElementById("questionDisplay").innerHTML = "";
    document.getElementById("optionButton1").innerHTML = "";
    document.getElementById("optionButton2").innerHTML = "";
    document.getElementById("resetQuizButton").style.cssText = `display: none;`;
    document.getElementById("section1").style.cssText = `display: flex;`;
    document.getElementById("section3").style.cssText = `display: flex;`;
    document.getElementById("scoreDisplay").style.cssText = `display: none;`;
    document.getElementById("section2").style.cssText = `display: none;`;
    document.getElementById("questionDisplay").style.cssText = `display: none;`;
    document.getElementById("scoreCounter").style.cssText = `display: none;`;
    
    
}

async function gameOver(){
    await storeResults();
    isGameRunning = false;
    questionUsed = [];
    clearInterval(timerInterval);
    isTimerRunning = false;
    accumulate = 0;
    document.getElementById("currentScore").innerHTML = "Game over! You scored " + scoreCounter + " points! ";
    document.getElementById("resetQuizButton").style.cssText = `display: block;`;
    document.getElementById("scoreDisplay").style.cssText = `border-left: ${progressBarWidth}px solid #d32e2e;`
}

let quizResults = [];

let isResultsBeingStored = false;

async function storeResults(){
    if (isResultsBeingStored) {
        console.log('Results are already being stored!');
        return;
    }
    isResultsBeingStored = true;
    let username = document.getElementById("username").value;
    let score = scoreCounter;
    
    const response = await fetch("save_score.php", {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: `username=${username}&score=${score}`
    });
    
    if (response.ok) {
        const data = await response.text();
        console.log(data);
    } else {
        console.error("Failed to store results: ", response.status);
    }
}

function populateLeaderboardTable(){
    if (isLeaderboardBeingPopulated) {
        console.log('Leaderboard is already being populated!');
        return;
    }
    isLeaderboardBeingPopulated = true;
    console.log("Start of get scores");
    let table = document.getElementById("leaderboard").getElementsByTagName("tbody")[0];

    while (table.rows.length > 0) {
        table.deleteRow(0);
    }

    let firstPlace = '<span style="font-size:24px;">' + "🥇" + '</span>';
    let secondPlace = '<span style="font-size:24px;">' + "🥈" + '</span>';
    let thirdPlace = '<span style="font-size:24px;">' + "🥉" + '</span>';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_scores.php", true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log("this.responseText: " + this.responseText);
                try {
                    let scores = JSON.parse(this.responseText);
                    for (let i = 0; i < scores.length; i++) {
                        let row = table.insertRow(i);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        if (i == 0){
                            cell1.innerHTML = firstPlace;
                            cell2.innerHTML = scores[i].username;
                            cell3.innerHTML = scores[i].score;
                        } else if (i == 1){
                            cell1.innerHTML = secondPlace;
                            cell2.innerHTML = scores[i].username;
                            cell3.innerHTML = scores[i].score;
                        } else if (i == 2){
                            cell1.innerHTML = thirdPlace;
                            cell2.innerHTML = scores[i].username;
                            cell3.innerHTML = scores[i].score;
                        } else {
                            cell1.innerHTML = i + 1;
                            cell2.innerHTML = scores[i].username;
                            cell3.innerHTML = scores[i].score;
                        }
                
                        
                    }
                } catch (e) {
                    console.error("Parsing JSON failed: ", e);
                    console.error("Raw response:", this.responseText);
                }
            } else {
                console.error("Fetching scores failed: ", this.status, this.statusText);
            }
        }
    };
    xhr.send();
}