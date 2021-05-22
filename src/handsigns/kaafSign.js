import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const kaafSign = new GestureDescription('ك');

/* 
poseData
0: (3) ["Thumb", "Half Curl", "Diagonal Up Left"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "No Curl", "Vertical Up"]
4: (3) ["Pinky", "No Curl", "Vertical Up"]
*/

//Thumb (Half Curl, Diagonal Up left/right)
kaafSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
kaafSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
kaafSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

//All other fingers (No Curl, Vertical Up)
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  kaafSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  kaafSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
