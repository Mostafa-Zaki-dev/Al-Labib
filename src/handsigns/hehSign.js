import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const hehSign = new GestureDescription('Heh_Letter');

/* 
poseData right hand 
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "No Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Half Curl", "Vertical Up"]
4: (3) ["Pinky", "Half Curl", "Diagonal Up Right"]


poseData left hand
0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "Half Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Half Curl", "Vertical Up"]
3: (3) ["Ring", "Half Curl", "Vertical Up"]
4: (3) ["Pinky", "Half Curl", "Diagonal Up Left"]
*/

//Thumb (No Curl, Diagonal Up left/right)
hehSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
hehSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.8);
hehSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.5);
hehSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
hehSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

//All other fingers (Half Curl, Diagonal Up left/right (best) or Vertical Up)
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  hehSign.addCurl(finger, FingerCurl.HalfCurl, 0.8);
  hehSign.addDirection(finger, FingerDirection.VerticalUp, 0.7);
  hehSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  hehSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}
