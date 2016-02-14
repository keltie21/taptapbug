var canvas = new Object();
var bugs = new Array();
var dead = new Array();
var foods = new Array();
gameover = false;
state = "start"
var isLevel1 = true;
var levelSpeed = 0;
spawnOnce = false;

// catch all for startup items
function init()
{
	canvas = document.getElementById('game-screen');
	context = canvas.getContext('2d');
	canvas.addEventListener("mousedown", getPosition, false);

	startScreen();
}

function drawStartCanvas()
{
	drawBar();
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

function getHighScore(lvl)
{
	if (lvl && localStorage.level1HiScore)
	{
		return localStorage.level1HiScore;
	}
	else if (!lvl && localStorage.level2HiScore)
	{
		return localStorage.level2HiScore;
	}
	else
	{
		return "N/A";
	}
}

var LevelButton = function(lvl, x, y, selected)
{
	context.fillStyle = "white";
	context.beginPath();
	context.arc(x, y, 15, 0, 2 * Math.PI, false);
	context.stroke();
	context.fill();
	if (selected)
	{
		context.fillStyle= "grey";
		context.arc(x, y, 15, 0, 2 * Math.Pi, false);
		context.stroke();
		context.fill();
	}
	context.fillStyle = "black";
	context.font="20px Calibri";

	context.fillText(lvl, x-5, y+5);
}

var StartButton = function()
{
	context.fillRect(100,350, 200, 100);
	context.fillStyle="black";
	context.font="70px Calibri";
	context.fillText("GO!",145,420);
}

// draws the initial splash screen
function startScreen()
{
	context.clearRect(0,0,400,600);
	context.fillRect(50,50,300,500);

	context.fillStyle = "white";
	context.font="35px Calibri";
	context.fillText("High Score:  " + getHighScore(isLevel1), 65, 150);	
	

	lvl1 = new LevelButton(1,220, 240, isLevel1);
	lvl2 = new LevelButton(2,300, 240, !isLevel1);

	context.fillStyle = "white";
	context.font = "35px Calibri";
	context.fillText("LEVEL:", 65, 250);

	start = new StartButton();
}

// handles mouse events on main canvas based on different game states
function getPosition(event) 
{
	var x = event.offsetX;
	var y = event.offsetY;
	switch(state)
	{
		case "playing":	
		    if (isPaused)
		        return;
		    console.log(bugs.length);
		    for (i = 0; i < bugs.length; i++) {
		        var hit = bugs[i].checkPosition(x, y, 30);
		        if (!hit) {
		            // http://www.w3schools.com/js/js_array_methods.asp
		            dead.push(bugs[i]);
		            bugs.splice(i, 1);
		            
		        }
		        console.log("dead: " + dead.length);
		    }
		    break;
		case "start":
			//console.log(x + " " + y);
			//check lvl2 button (probably better way to do this)
			var dx = x - 300;
        	var dy = y - 240;
        	if (dx * dx + dy * dy <= 225) 
        	{
               	isLevel1 = false;
            	startScreen();
            }

            //check lvl1 button...
            dx = x - 220;
        	dy = y - 240;
        	if (dx * dx + dy * dy <= 225) 
        	{
            	isLevel1 = true;
            	startScreen();
            }

            //check start button  100,350, 200, 100
            if ((x > 100) && (x < 300) && (y > 350) && (y < 450))
            {
                state = "playing";
                isLevel1 = true;
            	setInfo();
            	drawStartCanvas();
            }
			break;
		case "end":
			if ((x > 100) && (x < 300) && (y > 350) && (y < 450))
			{
			    if (isLevel1 && !gameover) {
			        state = "playing";
			        isLevel1 = false;
			        setInfo();
			        drawStartCanvas();
			    }
			    else {
			        state = "start";
			        isLevel1 = true;
			        pButton.undraw();
			        startScreen();
			    }
            }
            break;
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
    if(!spawnOnce)
    {
    	setTimeout(spawnBug, nextBugTime);
    }
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
        gameOver("died");
    else if (timer == 0)
        gameOver("won");
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
        for (i = 0; i < dead.length; i++) {
            var a = dead[i].fadeOut();
            if (a <= 0)
                dead.splice(i, 1);
            else
                dead[i].makeBug();
        }
        window.requestAnimationFrame(drawFrame);
    }
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
	// 35 = radius of food (25) plus distance from bug center to head (10)

	if (food[0] < 35)
	{
		eatFood(food[1]);
	}
}

function endScreen(died)
{
	bugs = []; // reset bugs
	food = []; // reset foods
	if(died == "died")
	{
	    context.fillStyle = "red";
	    gameover = true;
	}
	context.clearRect(0,0,400,600);
	context.fillRect(50,50,300,500);

	context.fillStyle = "white";
	context.font="35px Calibri";
	context.fillText("You " + died + "!", 65, 100);
	context.fillText("Your Score:  " + score, 65, 180);	

	start = new StartButton();

}
function eatFood(food)
{
	console.log("Ate " + food);
	foods.splice(food, 1);
	if (foods.length == 0)
	{
		state = "end";
		isPaused = true;
		endScreen("died");
	}
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
