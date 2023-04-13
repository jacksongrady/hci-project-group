var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames");

var host = "cpsc484-01.yale.internal:8888";
function setup() {
    // get the dimensions of the parent HTML element
   createCanvas(windowWidth, windowHeight);

}

function draw() {
    background(220);
    textAlign(CENTER);
    textSize(50);
    text('Do you think hotdogs are sandwhiches?', windowWidth/2, 100);
    text('Stand in front of TV to participate', windowWidth/2, windowHeight - 50);
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
            // var command = frames.get_pose_command(JSON.parse(event.data));
            // if (command !== null) {
            //     sendPoseCommand(command);
            // }
        }

    },

    // get_pose_command: function (frame) {
    //     var command = null;
    //     if (frame.people.length < 1) {
    //       return command;
    //     }
        
    //     // Normalize by subtracting the spine_chest joint coordinates
    //     var spine_chest_x = frame.people[0].joints[2].position.x;
    //     var spine_chest_y = frame.people[0].joints[2].position.y;
    //     var spine_chest_z = frame.people[0].joints[2].position.z;

    //     var left_wrist_x = (frame.people[0].joints[7].position.x - spine_chest_x) * -1;
    //     var left_wrist_y = (frame.people[0].joints[7].position.y - spine_chest_y) * -1;
       
    //     var right_wrist_x = (frame.people[0].joints[14].position.x - spine_chest_x) * -1;
    //     var right_wrist_y = (frame.people[0].joints[14].position.y - spine_chest_y) * -1;

    //     if (left_wrist_y < 0 && right_wrist_y < 0) {
    //         return command;
    //     }

    //     if (left_wrist_y > 400 && right_wrist_y > 400) { 
    //         command = 73; //Pose 3
    //     }

    //     if (left_wrist_y > 0 && right_wrist_y < -400) { 
    //         if (left_wrist_x > 400 && right_wrist_x < 200) { 
    //             command = 74 //Pose 1
    //         }
    //     }

    //     if (left_wrist_y < -400 && right_wrist_y > 0) {
    //         if (left_wrist_x < 200 && right_wrist_x > 400) {
    //             command = 75 //Pose 2
    //         }
    //     }
    //     return command;
    // },

    show: function (frame) {
        console.log(frame);
    }
};

// function sendPoseCommand(command) {
//     switch (command) {
//       case 73:
//         answer = 'exit';
//         break;

//       case 74:
//         answer = 'yes';
//         break;

//       case 75:
//         answer = 'no';
//         break;
//     }
//     console.log(answer);
//   }