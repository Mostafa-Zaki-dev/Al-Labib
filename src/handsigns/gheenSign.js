import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const gheenSign = new GestureDescription('Gheen_Letter');

/* 
poseData right hand 
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "Half Curl", "Horizontal Right"]
2: (3) ["Middle", "Half Curl", "Horizontal Right"]
3: (3) ["Ring", "Half Curl", "Horizontal Right"]
4: (3) ["Pinky", "Half Curl", "Horizontal Right"]

poseData left hand
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "Half Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Half Curl", "Horizontal Left"]
3: (3) ["Ring", "Half Curl", "Horizontal Left"]
4: (3) ["Pinky", "Half Curl", "Horizontal Left"]

*/

//Thumb (No Curl, Vertical Up)
gheenSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
gheenSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
gheenSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
gheenSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

//Index & Middle (Half Curl, Horizontal left/right)
for (let finger of [Finger.Index, Finger.Middle]) {
  gheenSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  gheenSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  gheenSign.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

//Ring & Pinky (Full Curl, Horizontal left/right)
for (let finger of [Finger.Ring, Finger.Pinky]) {
  gheenSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  gheenSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  gheenSign.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}
