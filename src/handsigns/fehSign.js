import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const fehSign = new GestureDescription('Feh_Letter');

/* 
poseData right hand 
0: (3) ["Thumb", "Half Curl", "Diagonal Up Right"]
1: (3) ["Index", "Half Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

poseData right left
0: (3) ["Thumb", "Half Curl", "Diagonal Up Left"]
1: (3) ["Index", "Half Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]
*/

//Thumb & Index (Half Curl, Diagonal Up left/right)
for (let finger of [Finger.Thumb, Finger.Index]) {
  fehSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  fehSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.8);
  fehSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.8);
}

//All other fingers (Full Curl, Vertical Up)
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  fehSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  fehSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
