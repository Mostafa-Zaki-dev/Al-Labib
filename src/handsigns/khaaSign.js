import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const khaaSign = new GestureDescription('Khaa_Letter');

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

/* Original */
//Thumb (No curl, Vertical up (best) or diagonal left/right)
// khaaSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
// khaaSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
// khaaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.3);
// khaaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.3);

/* Edit for better Gheen Letter detection */
//Thumb (No curl, Vertical up (best) or diagonal left/right)
khaaSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
khaaSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.7);
khaaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.5);
khaaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.5);

//All other fingers (Half curl, Horizontal left/right (best) or diagonal left/right)
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  khaaSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  khaaSign.addCurl(finger, FingerCurl.FullCurl, 0.5);
  khaaSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  khaaSign.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
  khaaSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.3);
  khaaSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.3);
}
