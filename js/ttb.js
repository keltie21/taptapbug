function drawStartCanvas()
{
	var canvas = document.getElementById('game-screen');
	var context = canvas.getContext('2d');
	_grid(context);
    makeBug(context, 150, 50, "orange", 300);
    makeBug(context, 50, 50, "black", 0);
    makeBug(context, 250, 50, "green", 45);
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