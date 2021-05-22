import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const meemSign = new GestureDescription('م');

/* 
poseData right hand 
0: (3) ["Thumb", "Half Curl", "Vertical Up"]
1: (3) ["Index", "Full Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "No Curl", "Diagonal Up Left"]

poseData left hand
0: (3) ["Thumb", "Half Curl", "Diagonal Up Right"]
1: (3) ["Index", "Full Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "No Curl", "Vertical Up"]
*/

//Thumb (Half Curl, Diagonal Up left/right)
meemSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
meemSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
meemSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
meemSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

//Pinky (No Curl, Vertical Up (best) or Diagonal Up left/right)
meemSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
meemSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
meemSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.5);
meemSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.5);

//All other fingers (Full Curl, Vertical Up)
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  meemSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  meemSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  meemSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.5);
  meemSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.5);
}
