import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const laamSign = new GestureDescription('ل');

/* 
poseData right hand 
0: (3) ["Thumb", "No Curl", "Horizontal Right"]
1: (3) ["Index", "No Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

poseData left hand
0: (3) ["Thumb", "No Curl", "Horizontal Left"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]
*/

//Thumb (No Curl, Horizontal left/right)
laamSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
laamSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
laamSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

//Index (No Curl, Vertical Up)
laamSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
laamSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//All other fingers (Full Curl, Vertical Up)
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  laamSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  laamSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
