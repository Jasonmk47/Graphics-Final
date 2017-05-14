// initialize variables
var context;
var request = new XMLHttpRequest();
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

request.open('GET', '../audio/weewoo.mp3', true);
request.responseType = 'arraybuffer';
request.send();
// onload function
request.onload = function () {
    newSong(request.response);
};

audio_file.onchange = function() {
  var file = this.files[0];
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function() {
      context.close();
      newSong(reader.result);
  };
};

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
            var randBin = chooseRandBin(freqArray);
            currentColor = colors[randBin];
            hist[randBin] += 1;
            // console.log(currentColor);
        };
        startAudio();

        source.onended = function() {
            console.log(hist); // prints histogram when finished
        };
    });
}

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

function startAudio() {
    source.start(context.currentTime); // default starts at 0
    // source.start(0);
    isPlaying = true;
}

function pauseAudio() {
    context.suspend();
    // source.disconnect();
    isPlaying = false;
}

function resumeAudio() {
    context.resume();
    // source.connect(analyser);
    isPlaying = true;
}

$('#pause_resume').click(function () {
    if (isPlaying) pauseAudio();
    else resumeAudio();
});