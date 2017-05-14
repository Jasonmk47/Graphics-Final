// initialize variables
var context;
var request;
var source;
var processor;
var analyser;
var isPlaying = false;
var hist = [];
var colors = [ // every color is repeated (32 => 64)
    '#fef59f',
    '#fef59f',
    '#f9e385',
    '#f9e385',
    '#f9d585',
    '#f9d585',
    '#feca89',
    '#feca89',
    '#fcbd89',
    '#fcbd89',
    '#f9a880',
    '#f9a880',
    '#f69578',
    '#f69578',
    '#f69589',
    '#f69589',
    '#f59393',
    '#f59393',
    '#f597a1',
    '#f597a1',
    '#f599b0',
    '#f599b0',
    '#f29cc0',
    '#f29cc0',
    '#d399c2',
    '#d399c2',
    '#b998c7',
    '#b998c7',
    '#a998c9',
    '#a998c9',
    '#9f99cb',
    '#9f99cb',
    '#94b3d9',
    '#94b3d9',
    '#85b0de',
    '#85b0de',
    '#7bb5e2',
    '#7bb5e2',
    '#82c2eb',
    '#82c2eb',
    '#85cae9',
    '#85cae9',
    '#6ecff6',
    '#6ecff6',
    '#75cee1',
    '#75cee1',
    '#7cced2',
    '#7cced2',
    '#80cdc0',
    '#80cdc0',
    '#8bceae',
    '#8bceae',
    '#97d1ac',
    '#97d1ac',
    '#9fd3a1',
    '#9fd3a1',
    '#a7d497',
    '#a7d497',
    '#b2d78a',
    '#b2d78a',
    '#d1e392',
    '#d1e392',
    '#e1e885',
    '#e1e885'
];
var currentColor;
var url = "../audio/weewoo.mp3"; // default

// start default chain
requester();

// file reader
audio_file.onchange = function() {
  var file = this.files[0];
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function() {
      context.close();
      newSong(reader.result);
  };
};

// new request
function requester() {
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.send();
    // onload function
    request.onload = function () {
        newSong(request.response);
    };
}

// Web Audio API to create context/buffers and play audio
function newSong(undecoded) {
    context = new AudioContext();
    context.decodeAudioData(undecoded, function (buffer) {
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

        // populate/reset histogram
        for (var i = 0; i < analyser.fftSize / 2; i++) {
            hist[i] = 0;
        }
        // connect nodes
        source.connect(analyser);
        analyser.connect(processor);
        source.connect(context.destination);
        processor.connect(context.destination);
        // function for processing frequency data
        processor.onaudioprocess = function(e) {
            freqArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(freqArray);
            // find a random bin (weighted by frequencies' outputs)
            var randBin = chooseRandBin(freqArray);
            currentColor = colors[randBin];
            // update histogram (for final output)
            hist[randBin] += 1;
            // console.log(currentColor);
        };
        // play audio
        startAudio();

        // function for when source finishes playing
        source.onended = function() {
            console.log(hist); // prints histogram when finished
        };
    });
}

// random bin selector for (frequency) array
function chooseRandBin(arr) {
    // sum of entire array
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    // find random number within range of array sum
    var rand = Math.floor(Math.random() * sum) + 1;

    // compare with running sum to select a weighted random index from array
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

// play audio (from beginning)
function startAudio() {
    source.start(context.currentTime); // default starts at 0
    // source.start(0);
    isPlaying = true;
}

// pause helper
function pauseAudio() {
    context.suspend();
    // source.disconnect();
    isPlaying = false;
}

// resume helper
function resumeAudio() {
    context.resume();
    // source.connect(analyser);
    isPlaying = true;
}

// pause/resume button click event
$('#pause_resume').click(function () {
    if (isPlaying) pauseAudio();
    else resumeAudio();
});