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
					pos: { x: 0, y: 0, z: 0 },
					vel: { x: 0, y: 0, z: 0 },
					color: currentColor
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
		particles[i].pos.z += particles[i].vel.z * delta_t;
	}
}

function updateParticlesVel(delta_t) {

	//Only check up to index
	for (var i = 0; i < index; i++) {
		particles[i].vel.x += 1 * delta_t;
		particles[i].vel.y += GRAVITY * delta_t;
		particles[i].vel.z += 1 * delta_t;
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

function updateParticles(delta_t) {

	updateParticlesVel(delta_t);
	updateParticlesPos(delta_t);
	
	checkCollisions();

	//redraw


}




