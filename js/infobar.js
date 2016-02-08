// JavaScript source code

var timer = 0;
var score = 0;

function setInfo(context) {
    timer = 60;
    score = 0;
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