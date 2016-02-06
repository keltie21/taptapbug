// Painting one bug with x, y being left top corner
function makeBug( context, x, y, color, angle){
    
    alpha = ".5"; 
    context.globalAlpha = alpha;
    
    //global(ish), pulled from bug drawing sequence
    bugWidth = 10;
    bugHeight = 40;

    // angle the bug (facing proper direction)
    radians = ((angle * Math.PI) / 180);
    
    context.save();
    
    context.translate( x , y); // center on bug
    console.log(context);
    context.rotate(radians); // rotate context
    
    //context.fillStyle = 'blue';
    //context.fillRect(25, 25, 50, 50);
    //context.restore();
    // console.log(context);
    // console.log(x);
    // console.log(y);
    // console.log(color);

    context.fillStyle="blue";
    context.fillRect(x,y,10,40);
    /*-- Whiskers, legs and arms--*/
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x+5, y+15);
    context.lineTo(x+10, y);
    context.moveTo(x+5, y+20);
    context.lineTo(x+4, y+22);
    context.lineTo(x+6, y+22);
    context.lineTo(x+5, y+20);
    context.moveTo(x, y+20);
    context.lineTo(x+10, y+40);
    context.moveTo(x+10, y+20);
    context.lineTo(x, y+40);
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke(); //na

    /*-- Triangles on the tips --*
    context.moveTo(x,y);
    context.lineTo(x, y+3);
    context.lineTo(x+1.73, y+2.4);
    context.lineTo(x, y);
    context.moveTo(x+10, y);
    context.lineTo(x+8.27, y+2.4);
    context.lineTo(x+10, y+3);
    context.lineTo(x+10, y);
    context.moveTo(x, y+20);
    context.lineTo(x, y+22);
    context.lineTo(x+1.6, y+21.25);
    context.lineTo(x, y+22);
    context.moveTo(x+10, y+20);
    context.lineTo(x+8.4, y+21.25);
    context.lineTo(x+10, y+22);
    context.lineTo(x+10, y+20);
    context.moveTo(x, y+40);
    context.lineTo(x, y+38);
    context.lineTo(x+1.6, y+38.25);
    context.lineTo(x, y+38);
    context.moveTo(x+10, y+40);
    context.lineTo(x+8.4, y+38.25);
    context.lineTo(x+10, y+38);
    context.lineTo(x+10, y+40);
    context.stroke();

    /*-- Body parts --*    
    context.beginPath();
    context.arc(x+5, y+15, 5, 0, 2*Math.PI);
    context.moveTo(x+5, y+21);
    context.bezierCurveTo(x, y+20, x, y+30, x+5, y+38.75);
    context.moveTo(x+5, y+21);	
    context.bezierCurveTo(x+10, y+20, x+10, y+30, x+5, y+38.75);
    context.fillStyle = color;
    context.lineWidth = 1;
    context.strokeStyle = "#000000"
    context.stroke();
    context.fill();

    /*-- Eyes and Mouth --*
    context.beginPath();
    context.arc(x+3.3, y+13.2, 1, 0, 2*Math.PI);
    context.arc(x+6.75, y+13.2, 1, 0, 2*Math.PI);
    context.fillStyle = "white";
    context.fill();
    context.beginPath();
    context.arc(x+5, y+15, 2.5, 0, Math.PI, false);
    context.stroke();
    */
    // restore angle
    context.restore();
    
}