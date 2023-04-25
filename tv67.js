var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames");

var host = "cpsc484-01.yale.internal:8888";

const questions = ["Do you feel satisfied with the quality of career strategy resources you are receiving at Yale University?",
                    "Do you believe that Yale University provides enough opportunities for extracurricular activities?",
                    "Do you find that Yale extracurricular clubs and organizations are overly selective?",
                    "Do you actively participate in Greek Life at Yale?",
                    "Do you think Yale should increase its efforts to accommodate dietary restrictions in dining halls?",
                    "Do you feel satisfied with the quality and availability of mental health resources on campus?",
                    "Do you believe that having an academic advisor was helpful to you in your first two years at Yale?",
                    "Do you feel satisfied with the academic support resources at Yale, including your residential college Dean?", 
                    "Do you like visiting the residential college butteries?", 
                    "Do you believe that TD buttery is the best buttery on campus?",
                    "Have you ever had a roommate horror story at Yale?",
                    "Have you ever found a mouse or a rat in your residential college?",
                    "Have you ever used ChatGPT to help with your homework?",
                    "Given the chance, would you join a secret society in your senior year?", 
                    "Have you switched your intended major more than once since coming to Yale?",
                    "Have you been to Woads more than ten times throughout your time at Yale?",
                    "Have you spoken to your academic advisor at any point in the last academic year?",
                    "Have you had to wait more than an hour for Yale Health services, even if the situation was urgent?",
                    "Do you think that Yale should offer minors or expand its certificate offerings?",
                    "Do you think listening to the bells on Harkness Tower provides a positive experience to Yale students?",
                    "Do you think GHeav's prices are too high considering its target customers?",
                    "Has having suitemates enhanced your Yale experience in a positive way?",
                    "Do you think it is fair that students are charged for laundry and printing?",
                    "Are Yale's science facilities up to date enough to conduct research at its fullest potential?"]


// Retrieve the last question index from local storage or initialize it to 0
let index = localStorage.getItem("index") || 0;


function setup() {
    // get the dimensions of the parent HTML element
  //createCanvas(windowWidth, windowHeight);
}
//
// function draw() {
//     // background(220);
//     // textAlign(CENTER);
//     // textSize(50);
//     // text('Do you think hotdogs are sandwhiches?', windowWidth/2, 100);
//     // text('Stand in front of TV to participate', windowWidth/2, windowHeight - 50);
// }

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
            answers[index][0]++;

          index++;
          if (index >= questions.length) {
            index = 0;
          }
          localStorage.setItem("answers", JSON.stringify(answers));
          localStorage.setItem("index", index);
          question.text(questions[index]);  

          window.location.href="TV-8.html";
        }
        if(global_answer == 'exit'){
            localStorage.setItem("index", index);

            window.location.href="TV-10.html";
        }
        if(global_answer == 'no'){
            answers[index][1]++;
            index++;
            if (index >= questions.length) {
              index = 0;
            }
            localStorage.setItem("answers", JSON.stringify(answers));
            localStorage.setItem("index", index);
            question.text(questions[index]);
  
            window.location.href="TV-8.html";
        }
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

