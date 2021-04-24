import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const ainSign = new GestureDescription('Ain_Letter');

/* 
poseData right hand 
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "Half Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Half Curl", "Horizontal Right"]
3: (3) ["Ring", "Full Curl", "Horizontal Right"]
4: (3) ["Pinky", "Full Curl", "Horizontal Right"]

0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "Half Curl", "Horizontal Right"]
2: (3) ["Middle", "Half Curl", "Horizontal Right"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Horizontal Right"]

poseData left hand
0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "Half Curl", "Horizontal Left"]
2: (3) ["Middle", "Half Curl", "Horizontal Left"]
3: (3) ["Ring", "Full Curl", "Horizontal Left"]
4: (3) ["Pinky", "Full Curl", "Horizontal Left"] 

*/

//Thumb (No Curl, Diagonal Up left/right)
ainSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ainSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
ainSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

//Index & Middle (Half Curl, Horizontal left/right)
for (let finger of [Finger.Index, Finger.Middle]) {
  ainSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  ainSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  ainSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  ainSign.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

//Ring & Pinky (Full Curl, Horizontal left/right)
for (let finger of [Finger.Ring, Finger.Pinky]) {
  ainSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ainSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  ainSign.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}
