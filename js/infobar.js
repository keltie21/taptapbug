// JavaScript source code

var timer = -1;
var score = 0;
var isPaused = false;

function drawBar()
{
	barCanvas = document.getElementById("controls");
	barContext = barCanvas.getContext("2d");
	barContext.font = "20px Calibri";
	drawPause();
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

function drawPause()
{
	barContext.clearRect(150,0, 100, 50);
	if(isPaused)
	{
		barContext.fillStyle = "red";
	}
	else
	{
		barContext.fillStyle = "white";
	}
	//draw pause button
	barContext.strokeStyle = "black";
	barContext.lineWidth = 3;
	
	barContext.beginPath();
	barContext.arc(200, 25, 20, 0, 2 * Math.PI, false);
	barContext.stroke();
	barContext.fill();

	if(isPaused)
	{
		barContext.moveTo(195,15);
		barContext.lineTo(195,35);
		barContext.lineTo(210,25);
		barContext.lineTo(195,15);
	}
	else
	{
		barContext.moveTo(195,15);
		barContext.lineTo(195,35);
		barContext.moveTo(205,15);
		barContext.lineTo(205,35);
	}
	barContext.stroke();

}

function setInfo(context) {
    timer = 60;
    score = 0;
    isPaused = false;
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
    console.log("Time: " + timer);
    drawTime();
    if (timer == 0)
        clearInterval(myTimer);
}

function pausing() {
    isPaused = !isPaused;
}