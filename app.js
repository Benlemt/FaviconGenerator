var im = require('imagemagick');
var path = require('path');

var formats = {
	'favicon_16.ico' : 16,
	'favicon_32.ico' : 32
}

window.ondragover = window.ondrop = function(e) { e.preventDefault(); return false; }

var el = document.querySelector('#drop');

el.ondragover = function() {
	this.className = "hover";
	this.innerHTML = "Drag your picture";
	return false;
}
el.ondragleave = function() {
	this.className = "";
	this.innerHTML = "Drop your picture";
	return false;
}
el.ondrop = function(e){
	e.preventDefault();
	for(var i = 0; i < e.dataTransfer.files.length; i++){
		var file = e.dataTransfer.files[i].path;
		var converted = 0;
		for(var format in formats){
			var size = formats[format];
			var output = path.dirname(file) + path.sep + format;
			im.convert([file, '-resize', size + 'x' + size, output], function(err, stdout){
				converted++;
				if(converted == Object.keys(formats).length){
					el.className = "";
					el.innerHTML = "Work completed !";
					document.getElementById("code_fav").innerHTML = "&#60;link rel=\"icon\" href=\"favicon_32.ico\" /&#62;";


				}
			})
		}
	}
}


