// JavaScript source code
var timer = -1;
var score = 0;
var isPaused = false;
var pButton = new Object();

// bar init function
function drawBar()
{
	barCanvas = document.getElementById("controls");
	barContext = barCanvas.getContext("2d");
	barCanvas.addEventListener("mousedown", checkPause, false);
	barContext.font = "20px Calibri";
	pButton = new PauseButton();
	drawScore();
	drawTime();
}

function drawScore()
{
	barContext.clearRect(300,0, 100, 50);
	barContext.fillStyle = "black";
	barContext.fillText("SCORE: "+score, 300, 30); 
}

function drawTime()
{
	barContext.clearRect(0,0, 150, 50);

	barContext.fillStyle = "black";
	barContext.fillText(timer, 10, 30);
	barContext.fillText("sec", 40, 30);
}

function checkPause(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    pButton.wasClicked(x, y);
}

var PauseButton = function()
{
    
    this.x = 200;
    this.y = 25;
    this.r = 20;

    this.undraw = function () {
        //console.log("erase");
        barContext.clearRect(150, 0, 100, 50);
        barContext.clearRect(0, 0, 150, 50);
        barContext.clearRect(300, 0, 100, 50);
    }

    this.redraw = function () {
        barContext.clearRect(150, 0, 100, 50);
        
        if (isPaused) {
            barContext.fillStyle = "red";
        }
        else {
            barContext.fillStyle = "white";
        }

        barContext.strokeStyle = "black";
        barContext.lineWidth = 3;

        barContext.beginPath();
        barContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        barContext.stroke();
        barContext.fill();

        if (isPaused) {
            barContext.moveTo(195, 15);
            barContext.lineTo(195, 35);
            barContext.lineTo(210, 25);
            barContext.lineTo(195, 15);
        }
        else {
            barContext.moveTo(195, 15);
            barContext.lineTo(195, 35);
            barContext.moveTo(205, 15);
            barContext.lineTo(205, 35);
        }
        barContext.stroke();
    }

	this.wasClicked = function (x, y) {
	    var dx = x - this.x;
	    var dy = y - this.y;
	    console.log("time to pause: ", dx, dy);
	    if (dx * dx + dy * dy <= this.r * this.r) {
	        pauseGame();
	    }
	    console.log(isPaused);
	}

}

function setInfo() {
    timer = 60;
    score = 0;
    isPaused = false;
    if (isLevel1)
        levelSpeed = 1;
    else
        levelSpeed = 1 + (1 / 3);
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
    drawScore();
}

function countdown() {
    if (!isPaused)
        timer--;
    //console.log("Time: " + timer);
    drawTime();
}

function pauseGame() {
    isPaused = !isPaused;
}

function newHighScore(score) {
    if (isLevel1)
        localStorage.level1HiScore = (localStorage.level1HiScore >= score) ? localStorage.level1HiScore : score;
    else 
        localStorage.level2HiScore = (localStorage.level2HiScore >= score) ? localStorage.level2HiScore : score;
    console.log("Hi-score: " + localStorage.level2HiScore);
}

function gameOver(died) {
    isPaused = true;
    state = "end"
    clearInterval(myTimer);
    newHighScore(score);
    endScreen(died);
}