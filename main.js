var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames");

var host = "cpsc484-01.yale.internal:8888";
function setup() {
    // get the dimensions of the parent HTML element
   createCanvas(windowWidth, windowHeight);

}

function draw() {
    background(220);
    ellipse(50, 50, 80, 80);
  }


$(document).ready(function () {
    frames.start();
});

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {
        console.log(frame);
    }
};

