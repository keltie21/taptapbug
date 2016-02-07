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

    checkDirections(bugs, foods);
}

function checkDirections(bugs, foods)
{
	var a,b,c; // a^2 + b^2 = c^2 ... pythagoras yo
	var min = [];
	for (i = 0; i < bugs.length; i++)
	{
		console.log("Bug "+i+": "+bugs[i].direction);
		for (j = 0; j < foods.length; j++)
		{
			
			a = bugs[i].x - foods[j].x;
			b = bugs[i].y - foods[j].y;
			c = Math.sqrt((a * a) + (b *b));
			if (!j)
			{
				min[i] = c;
			}
			if(c < min[i])
			{
				min[i] = c;
			}
			console.log(c);
			
		}
		console.log("min: "+min[i]);
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
