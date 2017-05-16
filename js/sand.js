var MAX_PARTICLES = 2000;
var PARTICLES_PER_STEP = 1;
var GRAVITY = -9.81 * 2;
var DRAG = 0.99;
var MIN_DIST = 6 // min distance between particles before collision

var particles = [];
var alive = [];
var accel = []
var index = 0; //Don't delete particles and only increase index

var _prev_t;
var _cur_t;
var _isRunning;

var bottom = centerY+100;
var left = centerX-100;
var right = centerX+100

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
      accel[i] = 1;
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

	if (isPlaying && currentColor) {
		for (var i = 0; i < PARTICLES_PER_STEP; i++) {
			if (Math.random() < .1) {  //With half probability 
				particles[index++] = {
					pos: { x: Math.random() * 20, y: 0 },
					vel: { x: Math.random() * 2 - 1, y: -100 },
					color: currentColor ? currentColor : "#FFF",
               movement: 10
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
      particles[i].movement += Math.abs(particles[i].vel.y * delta_t);
	}
}

function updateParticlesVel(delta_t) {

	//Only check up to index
	for (var i = 0; i < index; i++) {
		particles[i].vel.x += 0 * delta_t;
      particles[i].vel.x *= DRAG;
		particles[i].vel.y += GRAVITY * delta_t * accel[i];

      if (particles[i].movement < 0.1) { particles[i].vel = { x: 0, y: 0 }; particles[i].movement = 0}
      else particles[i].movement *= 0.9;
	}
}

function checkCollisionSand(delta_t) {

   for (var i = 0; i < index; i++) {
      for (var j = i + 1; j < index; j++) {

         if (particles[j].movement === 0)
            continue;

         dx = particles[i].pos.x - particles[j].pos.x;
         dy = particles[i].pos.y - particles[j].pos.y;

         // if collision detected
         if (Math.sqrt(dx*dx + dy*dy) < MIN_DIST && particles[i].vel.y > -1) {

            // set position back to height it was at previous time step
            particles[j].pos.y -= particles[j].vel.y * delta_t;

            if (particles[j].vel.x != 0) particles[j].vel.x = -dx * 3;
            particles[j].vel.y *= -0.1;

          }
      }
   }

}

function checkCollisionBottle() {

   for (var i = 0; i < index; i++) {
    
      // bottom
      if (particles[i].pos.y < -200) {
         particles[i].pos.y = -200;
         particles[i].vel = { x: 0, y: 0};
         accel[i] = 0;
      }

      // right
      if (particles[i].pos.x > 100) {
         particles[i].pos.x = 100;
         particles[i].vel.x = 0;
      }

      // left
      if (particles[i].pos.x < -100) {
         particles[i].pos.x = -100;
         particles[i].vel.x = 0;
      }

   }
}

function checkCollisions(delta_t) {

	checkCollisionSand(delta_t);
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

   ctx.clearRect(0, 0, canvas.width, canvas.height);
	updateParticlesPos(delta_t);
	  updateParticlesVel(delta_t);

   checkCollisions(delta_t);

	//redraw
	drawSand(particles);
}

$('#clear_particles').click(function clearParticles() {
  index = 0;
});



