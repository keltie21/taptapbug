function main()
{
	// get current time
	gamelength = 10000; // total game time
	gameStart = Date.now();
	console.log (gameStart);
	//var bug1 = new Bug!


	// set as 0
	// loop
}
// init function
function drawStartCanvas()
{
	var canvas = document.getElementById('game-screen');
	var context = canvas.getContext('2d');
	//_grid(context);
    //window.requestAnimationFrame(drawFrame);
    //spawnFood(canvas, context);
    //main();
    var bug1 = new Bug (50, 50, "green", 45);
    var bugs = [bug1];
    bugs.push(new Bug (100, 100, "orange", 22));
    
    foods = spawnFood(canvas);

    console.log("Bug 1: "+bugs[0].direction);
    console.log("Bug 2: "+bugs[1].direction);
    checkDirections(bugs, foods);
    console.log("Bug 1: "+bugs[0].direction);
    console.log("Bug 2: "+bugs[1].direction);
    for (i = 0; i < foods.length; i++)
    {
    	foods[i].addFood(context);
    }
    for (i = 0; i < bugs.length; i++)
    {
    	bugs[i].makeBug(context);
    }
}

// check what direction the bugs are supposed to be heading, and redirect them as needed
function checkDirections(bugs, foods)
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
			}
			if(c < min[i][0])
			{
				min[i] = [c, j];
			}			
		}

		// now get the slope y = mx +b
		dY = (bugs[i].y + 20) - (foods[min[i][1]].y + 25);  // these offsets should probably
		dX = (bugs[i].x + 5) - (foods[min[i][1]].x + 25);	// be variables...

		/*debug stuff here... can be removed later
		context.beginPath();
        context.moveTo(bugs[i].x + 5, bugs[i].y + 20);
        context.lineTo(foods[min[i][1]].x + 25, foods[min[i][1]].y + 25);
        
        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.stroke(); //na
		*/
		bugs[i].direction = Math.atan2(dY, dX ); //angle the bug

	}
}

function spawnFood(canvas) {
	var foods = [];
    for (i = 0; i < 5; i++) {
        var x = Math.floor(Math.random() * (canvas.width - 100) + 50);
        var y = Math.floor(Math.random() * (canvas.height - 200) + 150);
        foods.push(new Food(x,y));    
    }
    return foods; 
}

// this function will redraw the screen
function drawFrame(timestamp)
{
	moveBugs();

	//makeBug(context, 150, 50, "orange", 300);
    //makeBug(context, 50, (timestamp / 5 ), "black", 0);
    //makeBug(context, 250, 50, "green", 45);
    window.requestAnimationFrame(drawFrame)

	
}

function moveBugs( bug, context, animationStartTime)
{
	//for
}

//overlays a grid on the screen, for debug purposes
function _grid(context)
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
