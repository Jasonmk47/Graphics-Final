var MAX_PARTICLES = 1000;

var particles = [];
var alive = [];
var currentSong = null;
var isSongPlaying = false;


function startSong(songName) {
	currentSong = songName;
	isSongPlaying = true;

	//Whatever else you need to do here

}

function pauseSong() {
	isSongPlaying = false;

	//Whatever else you do here

}

function resumeSong() {
	isSongPlaying = true;

	//Whatever else you do here

}

function stopSong() {
	currentSong = null;
	isSongPlaying = false;

	//Whatever else you do here

}

window.onload = function initialize() {
	for (var i = 0; i < MAX_PARTICLES; i++) {
		alive[i] = false;
		particles[i] = null;
	}


	



}

//Called every time step while a song is playing
function createParticles() {

	if (isSongPlaying) {
		






	}
}


function updateParticles(delta_t) {
	console.log("test");




	requestAnimationFrame(updateParticles());
}


function run() {




}
