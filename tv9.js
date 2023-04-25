var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames");

var host = "cpsc484-01.yale.internal:8888";
function setup() {
    // get the dimensions of the parent HTML element
   //createCanvas(windowWidth, windowHeight);

}

function draw() {
    // background(220);
    // textAlign(CENTER);
    // textSize(50);
    // text('Do you think hotdogs are sandwhiches?', windowWidth/2, 100);
    // text('Stand in front of TV to participate', windowWidth/2, windowHeight - 50);
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
        var command = get_pose_command(frame);
        //console.log(command)
        if (command !== null) {
            sendPoseCommand(command);
        }
        if(frame.people.length == 1){
            one_person = 1;
        } else {
            one_person = 0;
        }
        if(global_answer == 'yes'){
            window.location.href="TV-6-7.html";
        }
        if(global_answer == 'exit'){
            window.location.href="TV-10.html";
        }
        // if(global_answer == 'no'){
        //     window.location.href="TV-5.html";
        // }
        //console.log(frame);
    }
};
var global_answer;
function sendPoseCommand(command) {
    answer = "test";
    switch (command) {
      case 73:
        answer = 'exit';
        break;

      case 74:
        answer = 'yes';
        break;

      case 75:
        answer = 'no';
        break;
    }
    global_answer = answer;
  }

function get_pose_command(frame) {

    if (frame.people.length < 1) {
      return null;
    }

    var head_y = (frame.people[0].joints[26].position.y) * -1;
    var right_h_y = (frame.people[0].joints[15].position.y) * -1;
    var left_h_y = (frame.people[0].joints[8].position.y) * -1;

    var right_hand_up = 0;
    var left_hand_up = 0;

    if(right_h_y - head_y > 0){
        right_hand_up = 1;
    }

    if(left_h_y - head_y > 0){
        left_hand_up = 1;
    }

    if(right_hand_up && !left_hand_up){
        return 75; 
    } else if (left_hand_up && !right_hand_up){

        return 74;
    } else if(left_hand_up && right_hand_up){
        return 73;
    } else {
        return null;
    }
}




