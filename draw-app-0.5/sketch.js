// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var c = 0;
var helpers = null;
var mirrorEnabled = false;
var mirrorLine = [];
var bgColor = 255;
var message;

function setup() {
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
    helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new eraserTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new sprayCanTool());
	toolbox.addTool(new bubbleTool());
	toolbox.addTool(new fillBucketTool());
	toolbox.addTool(new ShapesTool());
	// toolbox.addTool(new mirrorDrawTool());
	mirror = new mirrorDrawTool();
	background(bgColor);

	toolbox.tools.forEach(tool => {
		if (tool.hasOwnProperty("draw") && tool.name !== "mirrorDraw"){
			tool.originalDraw = tool.draw;
			tool.draw = function(){
				if (mirrorEnabled){
					// Draw mirrored
					mirror.draw(() => {
						tool.originalDraw();
					});
				} else {
					// Draw normally
					tool.originalDraw();
				}
			}
		}
	});

	if (mirrorEnabled){
		drawLine();
		loadPixels();
	} else {
		updatePixels();
	}

	push();
		message = createP();
		message.parent(select('.box options'));
		message.style('margin-top', '-0px');
		message.style('margin-left', '14px');
		message.style('color', 'white');
		// message.style('text-align', 'center');
		message.style('font-size', '16px');
		message.style('font-family', 'sans-serif');
		
		fill(255,255,0);
		textSize(15);
		brushSize = createSlider(1,75,1);
		brushSize.parent(select('.box options'));
		brushSize.position(310,620);
	pop();	
}

function draw() {
	push();
		message.html(`Brush size: ${brushSize.value()}`);
	pop();
	strokeWeight(brushSize.value());

	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user

	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}

	if (toolbox.selectedTool.name === "eraser"){
		stroke(bgColor);
	} else {
		stroke(c);
	} 
}

// Keep just in case VVV - dont think it actually does anything.

// function drawLine(){
// 	push();
// 	strokeWeight(3);
// 	stroke("red");

// 	if (this.axis == "x"){
// 		line(width / 2, 0, width / 2, height);
// 	} else {
// 		line(0, height / 2, width, height / 2);
// 	}
// 	pop();
// }
