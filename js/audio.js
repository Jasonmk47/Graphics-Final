// initialize variables
var context;
var request;
var source;
var processor;
var analyser;
var gain;
var isPlaying = false; // conditional to track whether audio is playing
var hist = []; // histogram for final output
// color palette
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
    '#9f99cb', // 32
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
var url = "../audio/sandstorm.mp3"; // default
var chart = $("#hist");

// preloaded file dropdown onchange
function dropdownChange(value) {
    context.close(); // end current audio
    url = value;
    requester(); // new request
}

// start default chain
requester();

// file reader
audio_file.onchange = function() {
  var file = this.files[0];
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function() {
      context.close(); // stop anything currently playing
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
// helpfuL: http://srchea.com/experimenting-with-web-audio-api-three-js-webgl
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
        analyser.fftSize = 128; // constant, needs to be power of 2
        // gain
        gain = context.createGain();

        // populate/reset histogram
        for (var i = 0; i < analyser.fftSize / 2; i++) {
            hist[i] = 0;
        }
        // connect nodes
        // analyzer
        source.connect(analyser);
        analyser.connect(processor);
        processor.connect(context.destination);
        // playback
        source.connect(gain);
        gain.connect(context.destination);

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
            generateHistogram();
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
    var rand = Math.floor(Math.random() * sum) + 1; // +1 because sum is from [1, total]

    // compare with running sum to select a weighted random index from array
    var partialSum = 0;
    for (var i = 0; i < arr.length; i++) {
        if (partialSum >= rand) {
            return i - 1;
        }
        else {
            partialSum += arr[i];
        }
    }
}

// gain event onchange
function gainChange(value) {
    gain.gain.value = value;
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
    // histogram so far
    generateHistogram();
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

// hide histogram title on load
// $(document).ready(function () {
//     $("#chart_title").hide();
// });

// generate histogram
function generateHistogram() {
    // show title when ready
    $("#chart_title").text("Frequency Histogram");

    // bins for x-axis
    var bins = []
    for (var i = 0; i < hist.length; i++) {
        bins[i] = i + 1;
    }

    // histogram
    var output = new Chart(chart, {
        type: 'bar',
        data: {
            labels: bins,
            datasets: [{
                data: hist,
                backgroundColor: colors,
            }]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        // display: false,
                        color: "rgba(0, 0, 0, .05)",
                    },
                }],
                yAxes: [{
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        // display: false,
                        color: "rgba(0, 0, 0, .05)",
                    },
                }]
            }
        }
    });
}
