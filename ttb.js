function drawStartCanvas()
{
	var canvas = document.getElementById('game-screen');
	var context = canvas.getContext('2d');
	context.fillStyle = "rgb(100, 100, 100)";
    context.fillRect (100, 100, 200, 400);
}