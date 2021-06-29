import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const khaaSign = new GestureDescription('خ');

/* 
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "Half Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Half Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Half Curl", "Diagonal Up Right"]

poseData Right hand
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "Full Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]

poseData Left hand
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "Half Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Left"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]
*/

//Thumb (No curl, Diagonal left/right)
khaaSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
khaaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
khaaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

//All other fingers (Half curl, Diagonal left/right)
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  khaaSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  khaaSign.addCurl(finger, FingerCurl.FullCurl, 0.5);
  khaaSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  khaaSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}
