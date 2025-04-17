function mirrorDrawTool() {
	this.name = "mirrorDraw";
	this.icon = "assets/mirrorDraw.jpg";

	//which axis is being mirrored (x or y) x is default
	this.axis = "x";
	//line of symmetry is halfway across the screen
	this.lineOfSymmetry = width / 2;

	// this.draw = function() {
	this.draw = function(drawFn){
		if (!mirrorEnabled){
			return drawFn();
		}

		//display the last save state of pixels
		// updatePixels();
		if (toolbox.selectedTool.name === "freehand"){
			//do the drawing if the mouse is pressed
			if (mouseIsPressed){
				//if the previous values are -1 set them to the current mouse location
				//and mirrored positions
				if (previousMouseX == -1){
					previousMouseX = mouseX;
					previousMouseY = mouseY;
					previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
					previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
				}

				//if there are values in the previous locations
				//draw a line between them and the current positions
				else {
					drawFn(previousMouseX, previousMouseY, mouseX, mouseY);

					previousMouseX = mouseX;
					previousMouseY = mouseY;

					//these are for the mirrored drawing the other side of the
					//line of symmetry
					var oX = this.calculateOpposite(mouseX, "x");
					var oY = this.calculateOpposite(mouseY, "y");
					drawFn(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
					previousOppositeMouseX = oX;
					previousOppositeMouseY = oY;
				}
			}
			//if the mouse isn't pressed reset the previous values to -1
			else {
					previousMouseX = -1;
					previousMouseY = -1;

					previousOppositeMouseX = -1;
					previousOppositeMouseY = -1;
			}
		}
	
		//after the drawing is done save the pixel state. We don't want the
		//line of symmetry to be part of our drawing
		// loadPixels();

		//push the drawing state so that we can set the stroke weight and colour
		push();

		// mirrorLine.push(this.drawLine()); //figure this out, it's creating too many of this because it's in draw.
		this.drawLine();
		this.populateOptions();

		if (this.axis == "x"){
			scale(-1,1);
			translate(-width,0);
		} else {
			scale(1,-1);
			translate(0,-height);
		}

		//Used to draw the tool but with the translated/scaled position
		drawFn();

		pop();

		// drawFn();
	}

	this.drawLine = function(){
		push();
		strokeWeight(3);
		stroke("red");

		if (this.axis == "x"){
			// line(width / 2, 0, width / 2, height);
			// select(".content").style
			document.getElementById("horizontalLine").style.display = "none";
			document.getElementById("verticalLine").style.display = "inline";
		} else {
			document.getElementById("verticalLine").style.display = "none";
			document.getElementById("horizontalLine").style.display = "inline";
			// line(0, height / 2, width, height / 2);
		}
		pop();
	}

	/*calculate an opposite coordinate the other side of the
	 *symmetry line.
	 *@param n number: location for either x or y coordinate
	 *@param a [x,y]: the axis of the coordinate (y or y)
	 *@return number: the opposite coordinate
	 */
	this.calculateOpposite = function(n, a) {
		//if the axis isn't the one being mirrored return the same
		//value
		if (a != this.axis) {
			return n;
		}

		//if n is less than the line of symmetry return a coorindate
		//that is far greater than the line of symmetry by the distance from
		//n to that line.
		if (n < this.lineOfSymmetry) {
			return this.lineOfSymmetry + (this.lineOfSymmetry - n);
		}

		//otherwise a coordinate that is smaller than the line of symmetry
		//by the distance between it and n.
		else {
			return this.lineOfSymmetry - (n - this.lineOfSymmetry);
		}
	};


	//when the tool is deselected update the pixels to just show the drawing and
	//hide the line of symmetry. Also clear options
	this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
	};

	//adds a button and click handler to the options area. When clicked
	//toggle the line of symmetry between horizonatl to vertical
	this.populateOptions = function() {
		let self = this;
		// select(".options").html("<button id='directionButton'>Make Horizontal</button>");
		document.getElementById("directionButton").style.display = "inline";

		// click handler
		select("#directionButton").mouseClicked(function() {
			// var button = select("#" + this.elt.id);
			var button = select("#directionButton");
			if (self.axis == "x") {
				self.axis = "y";
				self.lineOfSymmetry = height / 2;
				button.html('Make Vertical');
			} else {
				self.axis = "x";
				self.lineOfSymmetry = width / 2;
				button.html('Make Horizontal');
			}
		});
	};
}
