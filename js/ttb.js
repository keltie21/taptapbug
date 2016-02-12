var canvas = new Object();
var bugs = new Array();
var foods = new Array();
gameover = false;
//var context = canvas.getContext('2d');

//canvas.addEventListener("mousedown", getPosition, false);


function drawStartCanvas()
{
	canvas = document.getElementById('game-screen');
	context = canvas.getContext('2d');
	//bugs = new Array();
	//foods = new Array();

	canvas.addEventListener("mousedown", getPosition, false);
	//canvas.addEventListener("mousedown", function(){getPosition(bugs, foods )}, false);

	setInfo();

	drawBar();
    
	//startScreen();

	spawnBug();
    foods = spawnFood();
    
    
    

    for (i = 0; i < foods.length; i++)
    {
    	foods[i].addFood();
    }
    for (i = 0; i < bugs.length; i++)
    {
    	bugs[i].makeBug();
    }

    drawFrame(); 

}
function getHighScore()
{
	return "1337";
}
var LevelButton = function(lvl, x, y)
{
	context.fillStyle = "white";
	context.beginPath();
	context.arc(x, y, 15, 0, 2 * Math.PI, false);
	context.stroke();
	context.fill();
	context.fillStyle = "black";
	context.font="20px Calibri";

	context.fillText(lvl,x-5,y+5);
}

var StartButton = function()
{
	context.fillRect(100,350, 200, 100);
	context.fillStyle="black";
	context.font="70px Calibri";
	context.fillText("GO!",145,420);
}
function startScreen()
{
	context.clearRect(0,0,400,600);
	context.fillRect(50,50,300,500);

	context.fillStyle = "white";
	context.font="35px Calibri";
	context.fillText("High Score:  " + getHighScore(), 65, 150);	
	

	lvl1 = new LevelButton(1,220, 240);
	lvl2 = new LevelButton(2,300, 240);

	context.fillStyle = "white";
	context.font = "35px Calibri";
	context.fillText("LEVEL:", 65, 250);

	start = new StartButton();

	window.setTimeout(drawFrame, 10000);
	
}

function getPosition(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    if (isPaused)
        return;
    console.log(bugs.length);
    for (i = 0; i < bugs.length; i++) {
        var hit = bugs[i].checkPosition(x, y, 30);
        if (!hit)
            // http://www.w3schools.com/jsref/jsref_splice.asp
            bugs.splice(i, 1);
    }
}

// check what direction the bugs are supposed to be heading, and redirect them as needed
function checkDirections()
{
    if (isPaused)
        return;

	var a,b,c; // a^2 + b^2 = c^2 ... pythagoras yo
	var dX, dY; // deltaX and deltaY for slope calculation
	var min = []; // array of (minValue, foodIndex) tuples
	for (i = 0; i < bugs.length; i++)
	{
		for (j = 0; j < foods.length; j++)
		{
			a = bugs[i].x - foods[j].x;
			b = bugs[i].y - foods[j].y;
			c = Math.sqrt((a * a) + (b *b));
			if (!j)
			{
				min[i] = [c, j];
				//checkCollision(i, min[i][1]); // its more efficient to call this twice (gets called less overall)
			}
			if(c < min[i][0])
			{
				min[i] = [c, j];
				//checkCollision(i, min[i][1]); // its more efficient to call this here/////
			}
			
			 	
		}

		// now get the slope y = mx +b
		dY = (bugs[i].y + 20) - (foods[min[i][1]].y + 25);  // these offsets should probably
		dX = (bugs[i].x + 5) - (foods[min[i][1]].x + 25);	// be variables...
		
		// angle the bug
		bugs[i].direction = Math.atan2(dY, dX); 

		// see if this bug (i) is touching its closest food
		checkCollision(i,min[i]);

	}
}

//generate a bug, and determine how long until next bug
function spawnBug() 
{
    if (!isPaused) {
        whichBug = [1, 1, 1, 1, 2, 2, 2, 3, 3, 3]; //0.4 prob type 1 (orange); 0.3 type 2 (red); 0.3 prob type 3 (black);
        i = Math.floor(Math.random() * 10) // pick an index
        x = Math.floor(Math.random() * 380) + 10; // x coordinate between 10 and 390
        console.log(i);
        switch (whichBug[i]) {
            case 1:
                bugs.push(new Bug(x, 0, "orange", 0));
                break;
            case 2:
                bugs.push(new Bug(x, 0, "red", 0));
                break;
            case 3:
                bugs.push(new Bug(x, 0, "black", 0));
                break;
        }
    }
    nextBugTime = Math.floor(Math.random() * 2000) + 1000; // milliseconds between 1s and 2s
    setTimeout(spawnBug, nextBugTime);
}

function moveBugs()
{
    if (isPaused)
        return;
	//SOH CAH TOA FTW
	for(i = 0; i < bugs.length; i++)
	{
		bugs[i].x -= Math.cos(bugs[i].direction) * bugs[i].speed;
		bugs[i].y -= Math.sin(bugs[i].direction) * bugs[i].speed;
	}
}

function spawnFood() {
	var foods = [];
    for (i = 0; i < 5; i++) {
        var x = Math.floor(Math.random() * (canvas.width - 100) + 50);
        var y = Math.floor(Math.random() * (canvas.height - 200) + 150);
        foods.push(new Food( x, y ));
    }
    return foods;
}

// this function will redraw the screen
function drawFrame(timestamp)
{
    //if (isPaused)
    //    return;
    context.clearRect(0, 0, 400, 600); //wipe screen
    pButton.redraw();
    checkDirections(); //adjust direction to nearest food
    moveBugs();  //move the bugs

    // paint all the food to the screen
    if(foods.length == 0)
    {
        gameOver();
    }
    else {
        for (i = 0; i < foods.length; i++)
        {
            foods[i].addFood();
        }
        // paint all the bugs to the screen
        for (i = 0; i < bugs.length; i++)
        {
            bugs[i].makeBug();
        }
        window.requestAnimationFrame(drawFrame);
    }
        
    /*else
    {
    	if (!isPaused)
    	{
    		window.requestAnimationFrame(drawFrame);
    	}
    	else
    	{
    		pauseGame();
    	}
    }*/
	
}

// check if bug's head is touching food
function checkCollision(bug,food)
{	
	/*/console.log("derp"+food);
	var deltaX = Math.abs((foods[food].x + 25) - (bugs[bug].x - 5));
	var deltaY = Math.abs((foods[food].y + 25) - (bugs[bug].y - 20));

	//difference greater than half-width plus radius or half-height + radius
	if ( deltaX > (5 + 25) || deltaY > (20 + 25))
	{
		return false; //can short circuit this function
	}

	//differnce less than half of bug -> def colliding
	if (deltaX <= 5 || deltaY <= 20)
	{
		eatFood(food);
	}

	//pythagoras again (between bug middle and food middle)
	else if ((deltaX - 5)*(deltaX - 5) + (deltaY - 20)*(deltaY - 20) <= (25*25))
	{
		eatFood(food);
	}*/

	// it just occured to me that this can be done much simpler given:
	// a- bugs are always facing their food
	// b- bugs are always the same size
	// c- food is always the same size
	// also: i think it makes more sense to call collision when 
	// the bug's head touches the food, not its antennae

	if (food[0] < 35)
	{
		eatFood(food[1]);
	}


}


function eatFood(food)
{
	console.log("Ate " + food);
	foods.splice(food, 1);
	
}

//overlays a grid on the screen, for debug purposes
function _grid()
{
	for (i = 0; i < 600; i = i + 10)
	{
		context.beginPath();
		context.moveTo(0, i);
		context.lineTo(400, i);
		context.stroke();
	}
	for (i = 0; i < 400; i = i + 10)
	{
		context.beginPath();
		context.moveTo(i, 0);
		context.lineTo(i, 600);
		context.stroke();
	}
}
