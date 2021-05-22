import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const zeenSign = new GestureDescription('ز');

/* 
poseData Left hand  

poseData Right hand
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Half Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Left"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]
*/

//Thumb (No curl, Diagonal up left/right (best) or Vertical up)
zeenSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
zeenSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.1);
zeenSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
zeenSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

//Index (Half curl, Diagonal up left/right (best) or Vertical up)
zeenSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.2);
zeenSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
zeenSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
zeenSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
zeenSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);

//Middle (Half curl, Diagonal up left/right (best) or Vertical up)
zeenSign.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
zeenSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
zeenSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
zeenSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.25);

//Ring & Pinky (full Curl, Diagonal up left/right (best) or Vertical up)
for (let finger of [Finger.Ring, Finger.Pinky]) {
  zeenSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  zeenSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  zeenSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  zeenSign.addDirection(finger, FingerDirection.VerticalUp, 0.25);
}
