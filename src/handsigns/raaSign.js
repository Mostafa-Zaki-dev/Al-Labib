import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const raaSign = new GestureDescription('Raa_Letter');

/* 
poseData Left hand  
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Left"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]

0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "Half Curl", "Vertical Up"]
2: (3) ["Middle", "Half Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Left"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]

poseData Right hand
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "No Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]

0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]
*/

//Thumb (No curl, Diagonal up left/right (best) or Vertical up)
raaSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
raaSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.1);
raaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
raaSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

//Index (Half curl, Diagonal up left/right (best) or Vertical up)
raaSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
raaSign.addCurl(Finger.Index, FingerCurl.NoCurl, 0.8);
raaSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
raaSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
raaSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);

//All other fingers (full Curl, Diagonal up left/right (best) or Vertical up)
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  raaSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  raaSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  raaSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  raaSign.addDirection(finger, FingerDirection.VerticalUp, 0.25);
}
