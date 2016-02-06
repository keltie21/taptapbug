function drawStartCanvas()
{
	var canvas = document.getElementById('game-screen');
	var context = canvas.getContext('2d');
	//_grid(context);
    window.requestAnimationFrame(drawFrame);
    spawnFood(canvas, context);
}

function spawnFood(canvas, context) {
    for (i = 0; i < 5; i++) {
        var x = Math.floor(Math.random() * (canvas.width - 100) + 50);
        var y = Math.floor(Math.random() * (canvas.height - 200) + 150);
        addFood(context, x, y);
    }
}
var startTime = -1;
var animationLength = 2000;
function drawFrame(timestamp)
{
	
	var progress = 0;
	var canvas = document.getElementById('game-screen');
	var context = canvas.getContext('2d');
	context.clearRect(0,0,400,600);

	if (startTime < 0)
	{
		startTime = timestamp;
	}
	else
	{
		progress = timestamp - startTime;
	}

	if (progress < animationLength) 
	{
      window.requestAnimationFrame(drawFrame);
  	}
	//makeBug(context, 150, 50, "orange", 300);
    makeBug(context, 50, (timestamp / 5 ), "black", 0);
    //makeBug(context, 250, 50, "green", 45);

	
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
