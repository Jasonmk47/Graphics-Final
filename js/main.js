// Get the canvas element
var canvas = document.getElementById('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

   // Specify 2d canvas type
var ctx = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

var particles = [];
var maxParticles = [];

// Draw the cup
cup();

// Draw the sand particles
sand();

function cup() {
   // Draw the cup
   ctx.strokeStyle = '#555555';
   // ctx.fillRect(centerX-50, centerY, 100, 100);
   // ctx.clearRect(centerX-50, centerY, 100, 100);
   ctx.strokeRect(centerX-250, centerY, 500, 100);
}

function sand() {

}