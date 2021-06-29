import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const jeemSign = new GestureDescription('ج');

/* 
poseData right hand face 
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "Half Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Half Curl", "Vertical Up"]
3: (3) ["Ring", "Half Curl", "Vertical Up"]
4: (3) ["Pinky", "Half Curl", "Vertical Up"]

poseData left hand face
0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "Half Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Half Curl", "Diagonal Up Left"]
4: (3) ["Pinky", "Half Curl", "Diagonal Up Left"]
*/

//Thumb (No curl, Diagonal Up Left/Right)
jeemSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
jeemSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
jeemSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

//All other fingers (Half curl, diagonal up left/right)
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  jeemSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  jeemSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  jeemSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}
