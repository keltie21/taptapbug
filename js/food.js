// food class
var Food = function (x,y)
{
	this.x = x;
	this.y = y;

	this.addFood = function (cntxt, x, y) {
    	context = cntxt;
    	//http://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
    	food = new Image();
    	food.src = 'images/grape.jpg'; //Image from http://www.grubstreet.com/2014/11/new-york-times-minnesota-grape-recipe.html
    	food.onload = function () {
        	context.drawImage(food, x, y);
    	}
    }
}
