// food class
var Food = function (x,y)
{
	this.x = x;
	this.y = y;

    //http://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
	this.img = new Image()
	this.img.src = 'images/grape_clear.png'; //Image from http://www.grubstreet.com/2014/11/new-york-times-minnesota-grape-recipe.html

	this.addFood = function (context) {
    	/*context = cntxt;
    	context.fillStyle = "blue";
    	context.fillRect(this.x, this.y, 50, 50);*/
    	
	    //this.img.src = 'images/grape.jpg'; //Image from http://www.grubstreet.com/2014/11/new-york-times-minnesota-grape-recipe.html
	    context.drawImage(this.img, this.x, this.y);
	    this.img.onload = function () {
    		console.log("IN");
    		console.log(this.x);
        	//context.drawImage(this.img, this.x, this.y);
    	}
    }
}
