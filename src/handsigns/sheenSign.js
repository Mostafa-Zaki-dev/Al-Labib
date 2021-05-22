import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const sheenSign = new GestureDescription('ش');

/* 
poseData Right hand
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "No Curl", "Vertical Up"]
4: (3) ["Pinky", "No Curl", "Diagonal Up Left"]

poseData Left hand  
0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "No Curl", "Diagonal Up Left"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "No Curl", "Vertical Up"]
4: (3) ["Pinky", "No Curl", "Diagonal Up Right"]
*/

//Thumb,Index & Pinky (No Curl, Diagonal Up left/right)
for (let finger of [Finger.Thumb, Finger.Index, Finger.Pinky]) {
  sheenSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  sheenSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  sheenSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

//Middle & Ring (No Curl, Vertical Up)
for (let finger of [Finger.Middle, Finger.Ring]) {
  sheenSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  sheenSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
