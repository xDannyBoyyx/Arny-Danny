// function shapesTool() {
// 	this.icon = "assets/square.jpg";
// 	this.name = "shapesTool";
// 	this.selectedShape = "square";
// 	let startX = 0;
// 	let startY = 0;
// 	let drawing = false;

// 	this.draw = () => {
// 		if (mouseIsPressed && !drawing) {
// 			startX = mouseX;
// 			startY = mouseY;
// 			drawing = true;
// 		} else if (!mouseIsPressed && drawing) {
// 			let w = mouseX - startX;
// 			let h = mouseY - startY;
// 			this.drawShape(startX, startY, w, h);
// 			drawing = false;
// 		}
// 	};

// 	this.drawShape = (x, y, w, h) => {
// 		switch (this.selectedShape) {
// 			case "square": rect(x, y, w, h); break;
// 			case "circle": ellipse(x + w / 2, y + h / 2, abs(w), abs(h)); break;
// 			case "triangle": triangle(x, y + h, x + w / 2, y, x + w, y + h); break;
// 			case "star": drawStar(x + w / 2, y + h / 2, min(abs(w), abs(h)) / 2); break;
// 			case "arrow": drawArrow(x, y, w, h); break;
// 		}
// 	};

// 	// Toggle shape dropdown on tool click
// 	this.clicked = function () {
// 		let dropdown = select("#shapeDropdown");
// 		if (dropdown) {
// 			dropdown.style("display", dropdown.style("display") === "none" ? "flex" : "none");
// 		}
// 	};
// }
