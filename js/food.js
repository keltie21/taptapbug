// food class
var Food = function (x,y)
{
	this.x = x;
	this.y = y;

	this.addFood = function () {
    	
    	context.fillStyle = "blue";
    	context.fillRect(this.x, this.y, 50, 50);
    	//http://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
    	/*food = new Image();
    	food.src = 'images/grape.jpg'; //Image from http://www.grubstreet.com/2014/11/new-york-times-minnesota-grape-recipe.html
    	food.onload = function () {
    		console.log("IN");
    		console.log(this.x);
        	context.drawImage(food, food.x, food.y);
    	}*/
    }
}
