// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;
var mirrorEnabled = false;
var showDiv = false;
var trace = false;
var c = 0;
var bgColor = 255;

function setup() {
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width + 15, canvasContainer.size().height);
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
		options = document.getElementById('options');

		// fill(255,255,0);
		// textSize(15);

		// brushSize = createSlider(1,75,1);
		// brushSize.parent(select('.box options'));
		// brushSize.position(310,620);
		
		brushSize = document.createElement('input');
		brushSize.type = 'range';
		brushSize.min = 1;
		brushSize.max = 75;
		brushSize.value = 1;
		brushSize.id = 'brushSize';

		message = createP();
		message.parent(select('.box options'));
		options.appendChild(brushSize);
		message.style('padding-top', '4.5%');
		message.style('position', 'relative');
		message.style('right', '4.5%');
		message.style('font-family', '"Comic-Relief", system-ui');
		message.style('display', 'flex');
		message.style('justify-content', 'center');
		message.style('align-items', 'center');
		message.style('-webkit-text-stroke', '0.25px black')

		one = color(130, 153, 153);
		two = color(50, 234, 233);
	pop();	
}

function draw() {
	push();
		font = map(brushSize.value, 1, 75, 20, 30);
		message.style('font-size', font + "px");

		rangeWidth = map(brushSize.value, 1, 75, 90, 100);
		document.getElementById("brushSize").style.width = rangeWidth + "%";
		document.getElementById("brushSize").style.right = rangeWidth/30 + "%";

		percent = map(brushSize.value, 1, 75, 0, 1);
		fontColor = lerpColor(one, two, percent)
		message.style('color', fontColor);

		message.html(`Brush size: ${brushSize.value}`);
	pop();

	strokeWeight(brushSize.value);

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