import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const khaaSign = new GestureDescription('Khaa_Letter');

/* 
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "Half Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Half Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Half Curl", "Diagonal Up Right"]
*/

//Thumb (No curl, Vertical up or diagonal up / down)
khaaSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
khaaSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
khaaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
khaaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

//All other fingers (Half curl, Horizontal left/right (best) or diagonal down/up)
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  khaaSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  khaaSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  khaaSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  khaaSign.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
  khaaSign.addDirection(finger, FingerDirection.DiagonalDownLeft, 0.7);
  khaaSign.addDirection(finger, FingerDirection.DiagonalDownRight, 0.7);
}
