var MAX_PARTICLES = 1000;
var PARTICLES_PER_STEP = 1;
var GRAVITY = -9.81;

var particles = [];
var alive = [];
var index = 0; //Don't delete particles and only increase index

var _prev_t;
var _cur_t;
var _isRunning;

window.onload = function initialize() {
	// Draw the cup
   	ctx.strokeStyle = '#000000';
    // ctx.fillRect(centerX-50, centerY, 100, 100);
    // ctx.clearRect(centerX-50, centerY, 100, 100);
    ctx.lineWidth = 3;
    ctx.strokeRect(centerX-100, centerY-200, 200, 300);

	for (var i = 0; i < MAX_PARTICLES; i++) {
		alive[i] = false;
		particles[i] = null;
	}

//Should make a button for this
	start();
	step();
}

function start() {
	_prev_t = Date.now();
    _cur_t  = Date.now();
    _isRunning = true;
}

function step() {
    _cur_t  = Date.now();
    var elapsed  = (_cur_t - _prev_t) / 1000.0;
    _prev_t = _cur_t;
    if ( !_isRunning ) elapsed = 0.0;

	createParticles();
    updateParticles(elapsed);

	requestAnimationFrame(step);
}

function stop() {
    _isRunning = false;
}

function pause() {
    if ( _isRunning ) {
        stop();
    } else {
        start();
    }
}

//Called every time step while a song is playing
function createParticles() {

	if (isPlaying) {
		for (var i = 0; i < PARTICLES_PER_STEP; i++) {
			if (Math.random() < 1) {  //With half probability 
				particles[index++] = {
					pos: { x: 0, y: 0 },
					vel: { x: 0, y: -100 },
					color: currentColor ? currentColor : "#FFF"	
				};
			}
		}
	}
}

function updateParticlesPos(delta_t) {

	//Only check up to index
	for (var i = 0; i < index; i++) {
		particles[i].pos.x += particles[i].vel.x * delta_t;
		particles[i].pos.y += particles[i].vel.y * delta_t;
	}
}

function updateParticlesVel(delta_t) {

	//Only check up to index
	for (var i = 0; i < index; i++) {
		particles[i].vel.x += 0 * delta_t;
		particles[i].vel.y += GRAVITY * delta_t;
	}
}

function checkCollisionSand() {

}

function checkCollisionBottle() {

}

function checkCollisions() {

	checkCollisionSand();
	checkCollisionBottle();

}

// draws sand particle with center (x, y) and color 
function drawSandParticle(x, y, color) {

	var x_offset = 150;
	var y_offset = 250;

    ctx.beginPath();
    ctx.arc(x + x_offset, -y + y_offset, 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}


function drawSand(particles) {
    for (var i = 0; i < index; i++) {
    	drawSandParticle(particles[i].pos.x, particles[i].pos.y, particles[i].color );
    }
}

function updateParticles(delta_t) {

	updateParticlesVel(delta_t);
	updateParticlesPos(delta_t);
	
	checkCollisions();

	//redraw
	drawSand(particles);
}




