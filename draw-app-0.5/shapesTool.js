function ShapesTool() {
	this.icon = "assets/square.jpg";
	this.name = "shapesTool";

	let isDropdownVisible = false;
	let shapeOptions = ["circle", "triangle", "star", "arrow"];
	let currentShape = "square";

	this.unselectTool = function () {
		hideDropdown();
	};

	this.draw = function () {
		if (mouseIsPressed && mouseButton === LEFT && this.startX !== undefined) {
		
			fill();
			stroke(2);
			let w = mouseX - this.startX;
			let h = mouseY - this.startY;

			switch (currentShape) {
				case "square":
					rect(this.startX, this.startY, w, h);
					break;
				case "circle":
					ellipse(this.startX + w / 2, this.startY + h / 2, abs(w), abs(h));
					break;
				case "triangle":
					triangle(this.startX, this.startY + h,
							 this.startX + w / 2, this.startY,
							 this.startX + w, this.startY + h);
					break;
				case "star":
					drawStar(this.startX + w / 2, this.startY + h / 2, 5, abs(w / 2), abs(w));
					break;
				case "arrow":
					drawArrow(this.startX, this.startY, w, h);
					break;
			}
		}
	};

	this.mousePressed = function () {
		this.startX = mouseX;
		this.startY = mouseY;
	};

	this.mouseReleased = function () {
		this.startX = undefined;
		this.startY = undefined;
	};

	// Helper for drawing a star
	function drawStar(x, y, points, innerRadius, outerRadius) {
		let angle = TWO_PI / points;
		let halfAngle = angle / 2.0;
		beginShape();
		for (let a = 0; a < TWO_PI; a += angle) {
			let sx = x + cos(a) * outerRadius;
			let sy = y + sin(a) * outerRadius;
			vertex(sx, sy);
			sx = x + cos(a + halfAngle) * innerRadius;
			sy = y + sin(a + halfAngle) * innerRadius;
			vertex(sx, sy);
		}
		endShape(CLOSE);
	}

	// Placeholder for arrow
	function drawArrow(x, y, w, h) {
		line(x, y, x + w, y + h);
	}

	this.populateOptions = function () {
		let optionsDiv = select(".options");
		optionsDiv.html(""); // clear old content

		let shapeContainer = createDiv();
		shapeContainer.class("shapeDropdownContainer");
		optionsDiv.child(shapeContainer);

		// Main shape button
		let shapeButton = createImg("assets/square.jpg", "Main Shape");
		shapeButton.class("shapeMainButton");
		shapeContainer.child(shapeButton);

		let dropdown = createDiv();
		dropdown.class("shapeDropdown");
		dropdown.style("display", "none");
		shapeContainer.child(dropdown);

		shapeButton.mouseClicked(() => {
			isDropdownVisible = !isDropdownVisible;
			dropdown.style("display", isDropdownVisible ? "flex" : "none");
		});

		// Add options to dropdown
		shapeOptions.forEach(shape => {
			let shapeImg = createImg(`assets/${shape}.jpg`, shape);
			shapeImg.class("shapeOption");
			shapeImg.mouseClicked(() => {
				currentShape = shape;
				shapeButton.attribute("src", `assets/${shape}.jpg`);
				dropdown.style("display", "none");
				isDropdownVisible = false;
			});
			dropdown.child(shapeImg);
		});
	};

	function hideDropdown() {
		selectAll(".shapeDropdown").forEach(el => el.style("display", "none"));
		isDropdownVisible = false;
	}
}
