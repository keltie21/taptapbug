// JavaScript source code

var timer = 0;
var score = 0;
var isPaused = false;



function setInfo(context) {
    timer = 60;
    score = 0;
    isPaused = false;
    //http://www.w3schools.com/js/js_timing.asp
    myTimer = setInterval(countdown, 1000);
}

function takeDownInfo(context){
    clearInterval(myTimer);
}

function addScore(colour) {
    switch (colour) {
        case "orange":
            score += 1;    //60 fps / 60 fs
            break;
        case "red":
            score += 3; //75 fps / 60 fs
            break;
        case "black":
            score += 5;  //150fps / 60 fs
            break;
    }
}

function countdown() {
    if (!isPaused)
        timer--;
    console.log("Time: " + timer);
    if (timer == 0)
        clearInterval(myTimer);
}

function pausing() {
    isPaused = !isPaused;
}