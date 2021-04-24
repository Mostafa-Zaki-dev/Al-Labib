import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const yehSign = new GestureDescription('Yeh_Letter');

/* 
poseData right hand 
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "Full Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "No Curl", "Diagonal Up Left"]


poseData left hand
0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "Full Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "No Curl", "Diagonal Up Right"]
*/

//Thumb & Pinky (No Curl, Diagonal Up left/right)
for (let finger of [Finger.Ring, Finger.Pinky]) {
  yehSign.addCurl(finger, FingerCurl.NoCurl, 0.6);
  yehSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.5);
  yehSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.5);
}

//All other fingers (Full Curl, Vertical Up)
for (let finger of [Finger.Ring, Finger.Pinky]) {
  yehSign.addCurl(finger, FingerCurl.FullCurl, 0.6);
  yehSign.addDirection(finger, FingerDirection.VerticalUp, 0.5);
}
