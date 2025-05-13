// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop VVV
function dropHandler(ev) {
	// console.log("File(s) dropped");

	content = document.getElementById("content");

	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();

	if (ev.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		[...ev.dataTransfer.items].forEach((item, i) => {
			// If dropped items aren't files, reject them
			if (item.kind === "file") {
				const file = item.getAsFile();

				fileTypes = ['.png', '.jpg', '.jpeg', '.gif', '.pdf']

				for (let j=0; j<fileTypes.length; j++){
					if (file.name.endsWith(fileTypes[j])){
						console.log(`… file[${i}].name = ${file.name}`);
						document.getElementById("traceRemove").style.display = "inline";

						// https://stackoverflow.com/questions/22245100/how-to-display-an-image-from-a-file-input VVV
						var reader = new FileReader();

						reader.readAsDataURL(file);

						reader.onload = function(e){
							image = document.createElement("img");

							image.src = e.target.result;

							image.style.position = "absolute";
							image.style.opacity = "0.3";
							image.style.wmaxWidth = "1466px";
							image.style.maxHeight = "530px";
                			image.style.webkitUserDrag = "none";

							content.appendChild(image);
							document.getElementById("traceDiv").style.display = "none";
                            trace = true;

							select("#traceRemove").mouseClicked(function(){
                                trace = false;
								content.removeChild(image);
								document.getElementById("traceRemove").style.display = "none";
							});
						}
					}
				}
			}
		});
	} else {
		// Use DataTransfer interface to access the file(s)
		[...ev.dataTransfer.files].forEach((file, i) => {
		console.log(`… file[${i}].name = ${file.name}`);
		});
	}
}

function dragOverHandler(ev) {
	console.log("File(s) in drop zone");
  
	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();
}


// Same logic applied but to the 'choose a File' button shown in the drap and drop box. This works
// by choosing a file from your device rather than dropping it into the box. Only difference with this
// code is the window.onload because it didn't load the html fast enough and doesn't work otherwise.
window.onload = function () {
	document.getElementById("fileInput").addEventListener("change", function(event) {
	  chooseFile(event.target.files);
	});
}

// Shared logic for drag and file input
function chooseFile(file) {
	var content = document.getElementById("content");

	var fileTypes = ['.png', '.jpg', '.jpeg', '.gif', '.pdf'];

	[...file].forEach((file, i) => {
		if (fileTypes.some(type => file.name.toLowerCase().endsWith(type))) {
			console.log(`file[${i}].name = ${file.name}`);
			document.getElementById("traceRemove").style.display = "inline";

			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = function(e) {
				image = document.createElement("img");

				image.src = e.target.result;
				
				image.style.position = "absolute";
				image.style.opacity = "0.3";
				image.style.maxWidth = "1466px";
				image.style.maxHeight = "530px";
                image.style.webkitUserDrag = "none";

				content.appendChild(image);
				document.getElementById("traceDiv").style.display = "none";
                trace = true;

                select("#traceRemove").mouseClicked(function(){
                    trace = false;
					content.removeChild(image);
					document.getElementById("traceRemove").style.display = "none";
				});
			};
		}
	});
}