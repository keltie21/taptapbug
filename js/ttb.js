function drawStartCanvas()
{
	canvas = document.getElementById('game-screen');
	context = canvas.getContext('2d');
	bugs = new Array();
	foods = new Array();

	canvas.addEventListener("mousedown", function(){getPosition(bugs, foods )}, false);
	setInfo();

    bugs.push(new Bug (50, 50, "red", 45));
    bugs.push(new Bug (300, 300, "orange", 22));
    bugs.push(new Bug (150, 450, "black", 44));
    

    foods = spawnFood();

    checkDirections();

    for (i = 0; i < foods.length; i++)
    {
    	foods[i].addFood();
    }
    for (i = 0; i < bugs.length; i++)
    {
    	bugs[i].makeBug();
    }
}

// check what direction the bugs are supposed to be heading, and redirect them as needed
function checkDirections()
{
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

	}
}

function moveBugs()
{
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
	context.clearRect(0,0,400,600); //wipe screen
    checkDirections(); //adjust direction to nearest food
    moveBugs();  //move the bugs
    checkCollision(); //see if bug has food

	for (i = 0; i < foods.length; i++)
    {
    	foods[i].addFood();
    }
    for (i = 0; i < bugs.length; i++)
    {
    	bugs[i].makeBug();
    }

    window.requestAnimationFrame(drawFrame);
	
}

// check for collision between bug (rectancle) and food (circle)
// adapted from ideas on http://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle-in-html5-canvas
function checkCollision(bug,food)
{	
	console.log("herp "+food);
	//var deltaX = Math.abs((foods[food].x + 25) - (bugs[bug].x - 5));
	//var deltaY = Math.abs((foods[food].y + 25) - (bugs[bug].y - 20));

}
function getPosition() {

    var x = event.offsetX;
    var y = event.offsetY;

    // this is not where this goes.
    // only here now for debug
    drawFrame();
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
