function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	//local variables
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//Function allowing the drawing of the line(s)
	this.draw = function(){

		// makes a line from where user pressed and released mouse click
		if(mouseIsPressed){
			if(startMouseX == -1){
				// startMouse x and y is used to decide where the line starts
				startMouseX = mouseX;
				startMouseY = mouseY;
				// drawing is used to indicate whether user is still drawing, end of drawing indicates the end point of the line
				drawing = true;
				// loads pixels of canvas into the 'pixels' array
				loadPixels();
			}

			else{
				// updates the 'pixels' array with RGBA values
				updatePixels();
				//The line with the the intial x, y, and the end x, y.
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		//resets the parameters to allow another line to be drawn
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
