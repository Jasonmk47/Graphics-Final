// Get the canvas element
var canvas = document.getElementById('canvas');
// canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

   // Specify 2d canvas type
var ctx = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var width = 100;
var up = 100;
var down = 505;

var particles = [];
var maxParticles = [];
