import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const dalSign = new GestureDescription('Dal_Letter');

/* 
poseData Left hand  
0: (3) ["Thumb", "No Curl", "Horizontal Left"]
1: (3) ["Index", "No Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

poseData Right hand
0: (3) ["Thumb", "No Curl", "Horizontal Right"]
1: (3) ["Index", "No Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]

0: (3) ["Thumb", "No Curl", "Horizontal Right"]
1: (3) ["Index", "Half Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]
*/

//Thumb (No Curl, Horizontal left/right )
dalSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
dalSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
dalSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

//Index (No Curl, Horizontal right/left)
dalSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
dalSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.1);
dalSign.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
dalSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

//All other fingers (Full curl, Diagonal up/left)
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  dalSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  dalSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  dalSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}
