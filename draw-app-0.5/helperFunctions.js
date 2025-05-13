function HelperFunctions() {
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

	select("#traceButton").mouseClicked(function(){
		if (!trace){
			showDiv = !showDiv;

			if (showDiv){
				document.getElementById("traceDiv").style.display = "grid";
			} else {
				document.getElementById("traceDiv").style.display = "none";
			}
	
		} else {
			alert("There is already an image to trace. Otherwise try again.")
		}
	});

	/*show a box in the center of the screen saying "input file" and code it in to allow image file types.

	make it display the image onto the canvas but with a low opacity so that it can be traced.
	*/

	// Think about adding a gradient button that allows for the user to draw lines with gradients but works for any tool.
	// use lerp per chance or what you did for color palettes in graphics. Figure out how to choose two colors from the color palette.
}