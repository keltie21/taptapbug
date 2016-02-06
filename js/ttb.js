function drawStartCanvas()
{
	var canvas = document.getElementById('game-screen');
	var context = canvas.getContext('2d');
    makeBug(context, 50, 50, "orange");
    makeBug(context, 150, 50, "black");
    makeBug(context, 250, 50, "red");
    //addFood(context, 100, 100);
    spawnFood(canvas, context);
}

function spawnFood(canvas, context) {
    for (i = 0; i < 5; i++) {
        var x = Math.floor(Math.random() * (canvas.width - 100) + 50);
        var y = Math.floor(Math.random() * (canvas.height - 200) + 150);
        addFood(context, x, y);
    }
    
}