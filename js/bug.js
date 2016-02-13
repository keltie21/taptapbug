// bug class
var Bug = function (x, y, colour, direction)
{
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.alpha = 1.0;
    this.direction = direction;
    this.active = false;
    // speed is based on colour
    switch(colour)
    {
        case "orange":
            this.speed = 1 * levelSpeed;    //60 fps / 60 fs
            break;
        case "red":
            this.speed = 1.25 * levelSpeed; //75 fps / 60 fs
            break;
        case "black":
            this.speed = 2.5 * levelSpeed;  //150fps / 60 fs
            break;
    }

    // Painting one bug
    this.makeBug = function () {

        // save context pre-rotate
        context.save();

        context.globalAlpha = this.alpha;
    
        //pulled from bug drawing sequence
        bugWidth = 10;
        bugHeight = 40;

        // angle the bug (facing proper direction)
        radians = this.direction - Math.PI/2;

        // save context pre-rotate
       // context.save();
    
        // center on bug's center point (so rotate is clean)
        context.translate( this.x + (bugWidth/2), this.y +(bugHeight/2)); 

        // rotate context
        context.rotate(radians); 

        // move context back to top left to draw the bug
        context.translate( bugWidth / -2, bugHeight /-2);

        /*-- Whiskers, legs and arms--*/
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(5, 15);
        context.lineTo(10, 0);
        context.moveTo(5, 20);
        context.lineTo(4, 22);
        context.lineTo(6, 22);
        context.lineTo(5, 20);
        context.moveTo(0, 20);
        context.lineTo(10, 40);
        context.moveTo(10, 20);
        context.lineTo(0, 40);
        context.lineWidth = 2;
        context.strokeStyle = colour;
        context.stroke(); 

        /*-- Triangles on the tips --*/
        context.moveTo(0,0);
        context.lineTo(0, 3);
        context.lineTo(1.73, 2.4);
        context.lineTo(0, 0);
        context.moveTo(10, 0);
        context.lineTo(8.27, 2.4);
        context.lineTo(10, 3);
        context.lineTo(10, 0);
        context.moveTo(0, 20);
        context.lineTo(0, 22);
        context.lineTo(1.6, 21.25);
        context.lineTo(0, 22);
        context.moveTo(10, 20);
        context.lineTo(8.4, 21.25);
        context.lineTo(10, 22);
        context.lineTo(10, 20);
        context.moveTo(0, 40);
        context.lineTo(0, 38);
        context.lineTo(1.6, 38.25);
        context.lineTo(0, 38);
        context.moveTo(10, 40);
        context.lineTo(8.4, 38.25);
        context.lineTo(10, 38);
        context.lineTo(10, 40);
        context.stroke();

        /*-- Body parts --*/    
        context.beginPath();
        context.arc(5, 15, 5, 0, 2*Math.PI);
        context.moveTo(5, 21);
        context.bezierCurveTo(0, 20, 0, 30, 5, 38.75);
        context.moveTo(5, 21);	
        context.bezierCurveTo(10, 20, 10, 30, 5, 38.75);
        context.fillStyle = colour;
        context.lineWidth = 1;
        context.strokeStyle = "#000000"
        context.stroke();
        context.fill();

        /*-- Eyes and Mouth --*/
        context.beginPath();
        context.arc(3.3, 13.2, 1, 0, 2*Math.PI);
        context.arc(6.75, 13.2, 1, 0, 2*Math.PI);
        context.fillStyle = "white";
        context.fill();
        context.beginPath();
        context.strokeStyle = "white";
        context.arc(5, 15, 2.5, 0, Math.PI, false);
        context.stroke();
    
        // restore context angle
        context.restore();

        this.active = true;
    }
    //http://stackoverflow.com/questions/20814883/add-an-event-listener-to-a-drawn-object-on-html5-canvas
    this.checkPosition = function (x, y, r){
        var dx = x - this.x;
        var dy = y - this.y;
        if (dx * dx + dy * dy <= r * r && this.active) {
            addScore(this.colour);
            console.log("Click: " + score);
            this.active = false;
        }
        return this.active;
    }

    this.fadeOut = function () {
        this.alpha -= 0.0083;
        this.alpha = (this.alpha < 0) ? 0 : this.alpha;
        return this.alpha;
    }

}