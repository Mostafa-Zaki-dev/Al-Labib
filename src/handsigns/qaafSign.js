import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const qaafSign = new GestureDescription('ق');

/* 
poseData right hand 
0: (3) ["Thumb", "Half Curl", "Diagonal Up Right"]
1: (3) ["Index", "Half Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

poseData left hand
0: (3) ["Thumb", "Half Curl", "Vertical Up"]
1: (3) ["Index", "Half Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Half Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]
*/

//Thumb, Index & Middle (Half Curl, Diagonal Up left/right)
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle]) {
  qaafSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  qaafSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  qaafSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  qaafSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

//Ring & Pinky (Full Curl, Vertical Up)
for (let finger of [Finger.Ring, Finger.Pinky]) {
  qaafSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  qaafSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
