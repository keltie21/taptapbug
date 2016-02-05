function drawStartCanvas()
{
	var canvas = document.getElementById('game-screen');
	var context = canvas.getContext('2d');
    makeBug(context, 50, 50, "orange");
    makeBug(context, 150, 50, "black");
    makeBug(context, 250, 50, "green");
}