// initialize variables
var context = new AudioContext();
var request = new XMLHttpRequest();
var source;
var processor;
var analyser;
var isPlaying = false;
var hist = [];

request.open('GET', 'weewoo.mp3', true);
request.responseType = 'arraybuffer';
request.send();
// onload function
request.onload = function () {
    var undecodedAudio = request.response;

    context.decodeAudioData(undecodedAudio, function (buffer) {
        // create nodes
        // source
        source = context.createBufferSource();
        source.buffer = buffer;
        // js event processor
        processor = context.createScriptProcessor(2048);
        processor.buffer = buffer;
        // analyzer
        analyser = context.createAnalyser();
        analyser.fftSize = 128;
        for (var i = 0; i < 64; i++) {
            hist[i] = 0;
        }
        // connect nodes
        source.connect(analyser);
        analyser.connect(processor);
        source.connect(context.destination);
        processor.connect(context.destination);
        processor.onaudioprocess = function(e) {
            freqArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(freqArray);
            var randBin = chooseRandBin(freqArray) + 1; // 1-64 instead of 0-63
            hist[randBin-1] += 1;
            // console.log(randBin);
        };
        start();
    });
};
function chooseRandBin(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    var rand = Math.floor(Math.random() * sum) + 1;
    var partialSum = 0;
    for (var i = 0; i < arr.length; i++) {
        if (partialSum > rand) {
            return i - 1;
        }
        else {
            partialSum += arr[i];
        }
    }
}

function start() {
    source.start(context.currentTime); // default starts at 0
    // source.start(0);
    isPlaying = true;
}

function pause() {
    context.suspend();
    // source.disconnect();
    isPlaying = false;
    console.log(hist);
}

function resume() {
    context.resume();
    // source.connect(analyser);
    isPlaying = true;
}

$('#pause_resume').click(function () {
    if (isPlaying) pause();
    else resume();
});