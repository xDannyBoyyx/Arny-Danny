function fillBucketTool(){
	this.icon = "assets/fillBucketTool.jpg";
	this.name = "fillTool";

	this.draw = function(){
		// only run when mouse is pressed
		if (mouseIsPressed){
			loadPixels();

			let targetColor = get(mouseX, mouseY);
			let fillColor = color(currentColour);

			if (!colorsMatch(targetColor, fillColor)) {
				floodFill(mouseX, mouseY, targetColor, fillColor);
				updatePixels();
			}
		}
	};

	// Utility: check if two colors are "equal"
	function colorsMatch(c1, c2){
		return red(c1) === red(c2) &&
			   green(c1) === green(c2) &&
			   blue(c1) === blue(c2) &&
			   alpha(c1) === alpha(c2);
	}

	// Main flood fill function (non-recursive)
	function floodFill(x, y, targetColor, fillColor){
		let stack = [];
		stack.push([x, y]);

		while (stack.length > 0){
			let [cx, cy] = stack.pop();

			if (cx < 0 || cy < 0 || cx >= width || cy >= height){
				continue;
			}

			let index = 4 * (cy * width + cx);
			let currentColor = [
				pixels[index],
				pixels[index+1],
				pixels[index+2],
				pixels[index+3]
			];

			if (colorsMatch(color(currentColor), targetColor)){
				// set the new color
				pixels[index] = red(fillColor);
				pixels[index+1] = green(fillColor);
				pixels[index+2] = blue(fillColor);
				pixels[index+3] = alpha(fillColor);

				// push neighbors
				stack.push([cx+1, cy]);
				stack.push([cx-1, cy]);
				stack.push([cx, cy+1]);
				stack.push([cx, cy-1]);
			}
		}
	}
}
