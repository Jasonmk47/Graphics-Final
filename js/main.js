// Get the canvas element
var canvas = document.getElementById('canvas');

// canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

   // Specify 2d canvas type
var ctx = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var width = 100;
var up = centerY - 200;
var down = centerY + 200;

$('#screenshot_button').click(function screenshot() {
	var url = canvas.toDataURL('image/jpeg', 1.0);
	window.open(url);
});