function drawStartCanvas()
{
	var canvas = document.getElementById('game-screen');
	var context = canvas.getContext('2d');
	canvas.addEventListener("mousedown", getPosition, false);
	_grid(context);
    var a = makeBug(context, 150, 50, "orange", 300);
    var b = makeBug(context, 50, 50, "black", 0);
    var c = makeBug(context, 250, 50, "red", 45);
    var fruits = new Array();
    spawnFood(canvas, context, fruits);
}

function spawnFood(canvas, context, lst) {
    for (i = 0; i < 5; i++) {
        var x = Math.floor(Math.random() * (canvas.width - 100) + 50);
        var y = Math.floor(Math.random() * (canvas.height - 200) + 150);
        lst.push(addFood(context, x, y));
    }
}

function getPosition(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    a.checkPosition(x, y, 30);
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