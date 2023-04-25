# CPSC 484: HCI Group Project (Group 5)

### Members

1. Jackson Grady
2. Marcus Lisman
3. Misho Gabashvili
4. Danu Metaferia

## Installing Dependencies and Running the Project
<p>No additional dependencies are required for this project. It integrates p5.js with normal vanilla JavaScript, HTMl, CSS (with Bootstrap integrated for formatting), but as for additional dependencies, everything the project needs to run is already imported and included in the project files. The project runs as intended by the standard TV upload system discussed in class and used for installation testing.</p>

## Project Description and What the Installation Addresses
<p>Our group's project is an interactive polling program that seeks to gather student input about interesting and pertinent issues with minimal barriers to entry. When conducting our research about the problem space, the main concern students had was that making their voice heard took too much time or was too much of an effort that they didn't bother to use whatever system that specific poller at the time had in place. Our project removes those barriers by displaying questions on the screen that the user can respond to using simple poses that are read in as input by the Kinect system and processed as answers to that question. The user has full control over which questions they can answer and has full control over their experience with making their voice heard. The project displays as many questions as the user wants to answer and then displays the responses of other students in the form of a pie chart.</p>

<p>The installation addresses the barriers present to gathering student input as well as making one's voice heard. By making it easy for students to answer questions and easy for organizations to display questions and gather input in a fun, interactive way, the installation allows for a more effective and representative reading of student sentiment on certain issues, which can then inform university policy or give users a general idea of how students feel about certain topics. Essentially, it's an interactive system that makes polling easier for both the party gathering the information and the parties providing it.</p>

## Constraints from the Deployment Environment
<p>For our project to function as intended, only <b>ONE</b> user should be in front of the TV installation. Our code can only process one user going at a time since it uses the coordinates of the different poses on one person, so multiple users will result in an unsuccessful test run of the installation or unintended behavior.</p>

<p>Additionally, for the application to run as intended, the user should stand <b>about 4-5 feet</b> from the installation for the application to work correctly; however, there is some flexibility with this requirement due to how our group decided to calculate the change in vertical height of both limbs. As long as the Kinect can see that the difference between the right or left hand and the head is positive, it counts that as a raised hand, so the important thing is that the Kinect can see the head and hands, which only wouldn't occur if the user was right up at the screen with their hands above the Kinect and out of view. Therefore, we recommend 4-5 feet away (or even a bit more) just to get the smoothest user experience. Various y-axis measurements of the arms corresponding to the poses are being used to process user input and therefore decide what gets displayed on the screen, so it is important that the user remains at that distance so there is room for the Kinect to see that vertical change in movement from each of the respective poses</p>

<p>As a final point, we ask that when testing, <b>no sudden, constant movements</b> are made when trying to convey an answer because the Kinect might misinterpret something or the program might not transition the way we want. That type of behavior is unexpected, but we felt like it was a point worth including.</p>

## Collaboration Record

1. Jackson Grady
    - NetID: jdg77
    - Contribution: I helped set up and manage the repo. I set up the page transitions between pages, worked on pose detection, worked on setting up data collection and display for the questions we ask (pie charts), and also worked on the styling of the pages as well as general miscellaneous bug fixing. 
2. Marcus Lisman
    - NetID: mal249
    - Contribution: I helped with the question and answer database for the installation as well as writing up the Markdown file for the assignment that described dependencies, project description, and the collaboration record. I also helped with the coding for pose detection and debugging/testing onsite at the display to make sure the project was functional. Overall, my team worked well together and we pulled through with solid contributions from everyone to implement a working project.
3. Misho Gabashvili
    - NetID: mg2736
    - Contribution: I helped with setting up the instructions page, as well as organizing some other pages in the display. Implemented questions and allowed the program to display them in a sequential order using local storage and reset each time the program runs. Worked on the pose commands and conditional statements to gauge users' answers to questions. 
 4. Danu Metaferia
    - NetID: dym7
    - Contribution: I helped with pose detection and implementation, setup with the correct limbs for readings from the Kinect, and supported the rest of the team with general miscellaneous tasks.
