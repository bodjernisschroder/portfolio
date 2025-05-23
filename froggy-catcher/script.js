let username = document.getElementById("username").value;

let ingameSound = new Audio("sounds/ingame.mp3");
let startGameSound = new Audio("sounds/startgame.mp3");
let hovsaSound = new Audio("sounds/hovsa.mp3");
let laughOne = new Audio("sounds/grin-1.mp3");
let laughTwo = new Audio("sounds/grin-2.mp3");
let laughThree = new Audio("sounds/grin-3.mp3");
let wowSound = new Audio("sounds/wow.mp3");
let hapsSound = new Audio("sounds/haps.mp3");

ingameSound.loop = true;
ingameSound.volume = 0.05;
startGameSound.volume = 0.05;
laughOne.volume = 0.5;
laughTwo.volume = 0.5;
laughThree.volume = 0.5;
startGameSound.loop = true;

let currentLeftMargin = 50;
let currentTopMargin = 50;
let isGameRunning = false;
let timerInterval = 30;
let isIntervalActive = false;
let laughInterval = false;
let isGameInResetMode = false; 
let score = 0;

let isLeaderboardBeingPopulated = false;
let isGlobalStatsBeingPopulated = false;
populateLeaderboardTable();
populateGlobalStats();

let laughArray = [laughOne, laughTwo, laughThree]

startGameSound.load();
startGameSound.play();

document.addEventListener("keydown", function(event){
    username = document.getElementById("username").value;

    if(username !== ""){
        if(event.key === "ArrowUp" && !isGameInResetMode) {
            startGame();
            clearInterval(isIntervalActive);  
            moveSnakeUp();
        } 
        else if(event.key === "ArrowDown" && !isGameInResetMode) {
            startGame();
            clearInterval(isIntervalActive);  
            moveSnakeDown();
        }
        else if(event.key === "ArrowLeft" && !isGameInResetMode) {
            startGame();
            clearInterval(isIntervalActive);  
            moveSnakeLeft();
        }
        else if(event.key === "ArrowRight" && !isGameInResetMode) {
            startGame();
            clearInterval(isIntervalActive);  
            moveSnakeRight();
        }
    }
});

document.getElementById("resetGame").addEventListener("click", resetGame);
document.getElementById("mute").addEventListener("click", mute);

function startGame() {
    
        if (isGameRunning) {
            return;
        }
        document.getElementById("snake").src = "images/julius.png";
        isGameRunning = true;
        startGameSound.load();
        ingameSound.play();
        laughInterval = setInterval(function(){
            document.getElementById("snake").src = "images/julius-laugh.png";
            let random = Math.floor(Math.random()*4);
            laughArray[random].play();
            setTimeout(function(){
                document.getElementById("snake").src = "images/julius-eat2.png";
            }, 2000);
        }, 10000);
        document.getElementById("froggy").style.visibility = "visible";
        document.getElementById("snake").style.visibility = "visible";
        document.getElementById("arrowKeys").style.visibility = "hidden";
        document.getElementById("score").style.visibility = "visible";
        document.getElementById("mute").style.visibility = "hidden";
        document.getElementById("username").style.visibility = "hidden";
        frogStart();
    
}

let frogPositionLeft = Math.floor(Math.random()*90);
let frogPositionTop = Math.floor(Math.random()*90);

function frogStart(){
    document.getElementById("froggy").style.marginLeft = `${frogPositionLeft}%`;
    document.getElementById("froggy").style.marginTop = `${frogPositionTop}%`;
}

async function gameOver() {
    await storeResults();
    clearInterval(isIntervalActive);
    clearInterval(laughInterval);
    startGameSound.play();
    hovsaSound.play();
    ingameSound.load();
    isGameInResetMode = true;
    isGameRunning = false;
    document.getElementById("froggy").style.visibility = "hidden";
    document.getElementById("snake").style.visibility = "hidden";
    document.getElementById("resetGame").style.visibility = "visible";
    document.getElementById("gameoverScreen").style.visibility = "visible";
    document.getElementById("gameoverScreen").innerHTML = "Game over!<br>Final 🐸 count: " + score;
}

function resetGame(){
    isResultsBeingStored = false;
    isLeaderboardBeingPopulated = false;
    populateLeaderboardTable();
    populateGlobalStats();
    isGameInResetMode = false;
    document.getElementById("arrowKeys").style.visibility = "visible";
    document.getElementById("resetGame").style.visibility = "Hidden";
    document.getElementById("gameoverScreen").style.visibility = "hidden";
    document.getElementById("mute").style.visibility = "visible";
    currentLeftMargin = 50;
    currentTopMargin = 50;
    document.getElementById("snake").style.marginLeft = `${currentLeftMargin}%`;
    document.getElementById("snake").style.marginTop = `${currentTopMargin}%`;
    timerInterval = 30;
    score = 0;
    document.getElementById("score").innerHTML = "🐸 " + score;
    frogPositionLeft = Math.floor(Math.random()*90);
    frogPositionTop = Math.floor(Math.random()*90);
}

function eatFrog(){
    document.getElementById("snake").src = "images/julius-eat1.png";
    hapsSound.load();
    setTimeout(function(){
        document.getElementById("snake").src = "images/julius-eat2.png";
    }, 75);
    setTimeout(function(){
        document.getElementById("snake").src = "images/julius.png";
    }, 1000);
    timerInterval = Math.max(timerInterval - 2, 9);
    frogPositionLeft = Math.floor(Math.random()*90);
    frogPositionTop = Math.floor(Math.random()*90);
    frogStart(); 
    scoreCounter();
    hapsSound.play();
}

function scoreCounter(){
    score = score + 1;
    document.getElementById("score").innerHTML = "🐸 " + score;
}

function frogPosition(){
    if(Math.abs(currentLeftMargin - frogPositionLeft) < 11 && Math.abs(currentTopMargin - frogPositionTop) < 11){
        eatFrog();
    }
}

function moveSnakeLeft(){ 

    clearInterval(isIntervalActive);
    isIntervalActive = setInterval(function(){
        if(currentLeftMargin < 0){
            gameOver();
        } else {
            currentLeftMargin = currentLeftMargin - 1;
            document.getElementById("snake").style.marginLeft = `${currentLeftMargin}%`;
            frogPosition();
        }
    }, timerInterval);
}

function moveSnakeRight(){
    clearInterval(isIntervalActive);
    isIntervalActive = setInterval(function(){
        if(currentLeftMargin > 90){
            gameOver();
        } else {
            currentLeftMargin = currentLeftMargin + 1;
            document.getElementById("snake").style.marginLeft = `${currentLeftMargin}%`;
            frogPosition();
        }
    }, timerInterval);
}

function moveSnakeUp(){
    clearInterval(isIntervalActive);
    isIntervalActive = setInterval(function(){
        if(currentTopMargin < 0){
            gameOver();
        } else {
            currentTopMargin = currentTopMargin - 1;
            document.getElementById("snake").style.marginTop = `${currentTopMargin}%`;
            frogPosition();
        }
    }, timerInterval);
}
 
function moveSnakeDown(){
    clearInterval(isIntervalActive);
    isIntervalActive = setInterval(function(){
        if(currentTopMargin > 88){
            gameOver();
        } else {
            currentTopMargin = currentTopMargin + 1;
            document.getElementById("snake").style.marginTop = `${currentTopMargin}%`;
            frogPosition();
        }
    }, timerInterval);
}

function mute(){
    if(ingameSound.volume === 0.0){
        ingameSound.volume = 0.05;
        startGameSound.volume = 0.05;
        laughOne.volume = 0.5;
        laughTwo.volume = 0.5;
        laughThree.volume = 0.5;
        hapsSound.volume = 1.0;
        wowSound.volume = 1.0;
        hovsaSound.volume = 1.0;
        document.getElementById("mute").innerHTML = "🔊";
    } else {
        ingameSound.volume = 0.0;
        startGameSound.volume = 0.0;
        laughOne.volume = 0.0;
        laughTwo.volume = 0.0;
        laughThree.volume = 0.0;
        hapsSound.volume = 0.0;
        wowSound.volume = 0.0;
        hovsaSound.volume = 0.0;
        document.getElementById("mute").innerHTML = "🔇";
    }
}

let isResultsBeingStored = false;

async function storeResults(){
    if (isResultsBeingStored) {
        console.log('Results are already being stored!');
        return;
    }
    isResultsBeingStored = true;
    let username = document.getElementById("username").value;
    
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

    let firstPlace = '<span style="font-size:18px;">' + "🥇" + '</span>';
    let secondPlace = '<span style="font-size:18px;">' + "🥈" + '</span>';
    let thirdPlace = '<span style="font-size:18px;">' + "🥉" + '</span>';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_scores.php", true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            isLeaderboardBeingPopulated = false;
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

let totalAnimalsEaten = 0;


function populateGlobalStats(){
    if (isGlobalStatsBeingPopulated) {
        console.log('Leaderboard is already being populated!');
        return;
    }
    isGlobalStatsBeingPopulated = true;
    console.log("Start of get scores");
    let table = document.getElementById("globalStats").getElementsByTagName("tbody")[0];

    while (table.rows.length > 0) {
        table.deleteRow(0);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_scores_global.php", true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            isGlobalStatsBeingPopulated = false;
            if (this.status == 200) {
                console.log("this.responseText: " + this.responseText);
                try {
                    let scores = JSON.parse(this.responseText);
                    
                    let globalStats = JSON.parse(this.responseText);
                    
                    let row1 = table.insertRow(0);
                    let cell1 = row1.insertCell(0);
                    cell1.innerHTML = "Games played: " + globalStats.totalGames;
                
                    let row2 = table.insertRow(1);
                    let cell2 = row2.insertCell(0);
                    cell2.innerHTML = "Frogs eaten: " + globalStats.totalAnimalsEaten;
                
                    let row3 = table.insertRow(2);
                    let cell3 = row3.insertCell(0);
                    if (globalStats.averageAnimalsEaten !== null && !isNaN(globalStats.averageAnimalsEaten)) {
                        cell3.innerHTML = "Avg frogs per game " + parseFloat(globalStats.averageAnimalsEaten).toFixed(2);
                    } else {
                        cell3.innerHTML = "Average animals eaten per game: N/A";
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