// JavaScript source code

var timer = 0;
var score = 0;



function setInfo(context) {
    timer = 60;
    score = 0;
    //http://www.w3schools.com/js/js_timing.asp
    myTimer = setInterval(countdown, 1000);
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
    timer--;
    console.log("Time: " + timer);
    if (timer == 0)
        clearInterval(myTimer);
}