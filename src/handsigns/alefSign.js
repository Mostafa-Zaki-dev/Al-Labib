import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const alefSign = new GestureDescription('Alef-Letter');

/* 
poseData
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "Full Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Horizontal Left"]
4: (3) ["Pinky", "Full Curl", "Horizontal Left"]
*/

//Thumb (No curl, Vertical up (best) or diagonal up left / right)
alefSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
alefSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
alefSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.4);
alefSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.4);

//All other fingers (full Curl, Horizontal left/right)

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  alefSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  alefSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  alefSign.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
  alefSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  alefSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  alefSign.addDirection(finger, FingerDirection.DiagonalDownLeft, 1.0);
  alefSign.addDirection(finger, FingerDirection.DiagonalDownRight, 1.0);
}
