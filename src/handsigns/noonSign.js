import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const noonSign = new GestureDescription('Noon_Letter');

/* 
poseData right hand 
0: (3) ["Index", "No Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Half Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Half Curl", "Diagonal Up Right"]

0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "Half Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]

poseData left hand
0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "Half Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Left"]
4: (3) ["Pinky", "Full Curl", "Horizontal Left"]

0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "Half Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]
*/

//Thumb (No Curl, Vertical Up)
noonSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
noonSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
noonSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
noonSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

//Index (Half Curl, Diagonal Up left/right)
noonSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
noonSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
noonSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

//All other fingers (Full Curl, Vertical Up (best) or Diagonal Up left/right)
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  noonSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  noonSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  noonSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  noonSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}
