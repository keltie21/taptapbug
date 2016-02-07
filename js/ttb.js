canvas.addEventListener("mousedown", getPosition, false);
var bugs = new Array();
var fruits = new Array();
//spawnFood(canvas, context, fruits);
setInfo();

//var a = makeBug(context, 150, 50, "orange", 300);

function drawStartCanvas()
{
	var canvas = document.getElementById('game-screen');
	var context = canvas.getContext('2d');
	_grid(context);
    makeBug(context, 150, 50, "orange", 300);
    makeBug(context, 50, 50, "black", 0);
    makeBug(context, 250, 50, "red", 45);
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
    makeBug(context, x, y, "green", 0);
    //a.checkPosition(x, y, 30);
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