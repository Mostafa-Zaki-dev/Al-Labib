import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const wowSign = new GestureDescription('Wow_Letter');

/* 
poseData right hand 
0: (3) ["Thumb", "No Curl", "Horizontal Right"]
1: (3) ["Index", "Full Curl", "Horizontal Right"]
2: (3) ["Middle", "Full Curl", "Horizontal Right"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Horizontal Right"]

poseData left hand
0: (3) ["Thumb", "No Curl", "Horizontal Left"]
1: (3) ["Index", "Full Curl", "Horizontal Left"]
2: (3) ["Middle", "Full Curl", "Horizontal Left"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Left"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]
*/

//Thumb (No Curl, Horizontal left/right)
wowSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
wowSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
wowSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

//Index & Middle (Full Curl, Horizontal left/right)
for (let finger of [Finger.Index, Finger.Middle]) {
  wowSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  wowSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  wowSign.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

//Ring & Pinky (Full Curl, Horizontal or Diagonal Up left/right)
for (let finger of [Finger.Ring, Finger.Pinky]) {
  wowSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  wowSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  wowSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  wowSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  wowSign.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}
