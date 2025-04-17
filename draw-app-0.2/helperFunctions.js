function HelperFunctions() {

	//which axis is being mirrored (x or y) x is default
	this.axis = "x";
	//line of symmetry is halfway across the screen
	this.lineOfSymmetry = width / 2;

	//where was the mouse on the last time draw was called.
	//set it to -1 to begin with
	var previousMouseX = -1;
	var previousMouseY = -1;

	//mouse coordinates for the other side of the Line of symmetry
	var previousOppositeMouseX = -1;
	var previousOppositeMouseY = -1;

	//p5.dom click click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		//change background to white; clear canvas
		background(255);

		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		//save canvas as 'myPicture.jpg' to users' hard drive
		saveCanvas('myPicture.jpg');
	});

	select("#mirrorButton").mouseClicked(function(){
		mirrorEnabled = !mirrorEnabled;

		if (!mirrorEnabled){
			document.getElementById("directionButton").style.display = "none";
			document.getElementById("verticalLine").style.display = "none";
			document.getElementById("horizontalLine").style.display = "none";
		}
	});

	// select(".options").html(`
	// <button id="mirrorToggle">Toggle Mirror</button>
	// <button id="directionButton">Make Horizontal</button>`);
}