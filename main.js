var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames");

var host = "cpsc484-01.yale.internal:8888";
// function setup() {
//     // get the dimensions of the parent HTML element
//    createCanvas(windowWidth, windowHeight);

// }

// function draw() {
//     background(220);
//     textAlign(CENTER);
//     textSize(50);
//     text('Do you think hotdogs are sandwhiches?', windowWidth/2, 100);
//     text('Stand in front of TV to participate', windowWidth/2, windowHeight - 50);
//   }


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
        //console.log(frame);
    }
};

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
    console.log(answer);
  }

function get_pose_command(frame) {

    if (frame.people.length < 1) {
      return null;
    }
    
    // // Normalize by subtracting the spine_chest joint coordinates
    // var spine_chest_x = frame.people[0].joints[2].position.x;
    // var spine_chest_y = frame.people[0].joints[2].position.y;

    // var left_wrist_x = (frame.people[0].joints[7].position.x - spine_chest_x) * -1;
    // var left_wrist_y = (frame.people[0].joints[7].position.y - spine_chest_y) * -1;
   
    // var right_wrist_x = (frame.people[0].joints[14].position.x - spine_chest_x) * -1;
    // var right_wrist_y = (frame.people[0].joints[14].position.y - spine_chest_y) * -1;

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

    // //neither wrist is above the chest
    // if (left_wrist_y < 0 && right_wrist_y < 0) {
    //     return command;
    // }

    // //both wrists are significantly above the chest
    // if (left_wrist_y > 400 && right_wrist_y > 400) { 
    //     command = 73; //Pose 3 = 'exit'
    // }

    // //Note: the conditionals below are divided into two parts (for now) for clarity

    // //if left wrist is higher and right wrist is significantly lower than the chest
    // if (left_wrist_y > 0 && right_wrist_y < -400) { 
    //     //if left wrist is significantly farther from the chest but right wrist is somewhat close
    //     if (left_wrist_x > 400 && right_wrist_x < 200) { 
    //         command = 74 //Pose 1 = 'yes'
    //     }
    // }

    // //if left wrist is significantly lower and right wrist is higher than the chest
    // if (left_wrist_y < -400 && right_wrist_y > 0) {
    //     //if right wrist is significantly farther from the chest but left wrist is somewhat close
    //     if (left_wrist_x < 200 && right_wrist_x > 400) {
    //         command = 75 //Pose 2 = 'no'
    //     }
    // }
    // return command;
}