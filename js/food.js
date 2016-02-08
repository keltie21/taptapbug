// food class
var Food = function (x,y)
{
	this.x = x;
	this.y = y;
	this.active = false;

    //http://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
	this.img = new Image();
	this.img.src = 'images/grape_clear.png'; //Image from http://www.grubstreet.com/2014/11/new-york-times-minnesota-grape-recipe.html


	this.addFood = function () {
    	
    	context.fillStyle = "blue";
    	//context.fillRect(this.x, this.y, 50, 50);
        context.beginPath();
        context.arc(this.x + 25, this.y + 25, 25, 0, 2 * Math.PI, false);
    
        context.fill();
    	//http://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
    	/*food = new Image();
    	food.src = 'images/grape.jpg'; //Image from http://www.grubstreet.com/2014/11/new-york-times-minnesota-grape-recipe.html
    	food.onload = function () {
    		console.log("IN");
    		console.log(this.x);
        	//context.drawImage(this.img, this.x, this.y);
    	}*/

        this.active = true;
	}

	this.removeFood = function () {
	    this.active = false;
	}
}
