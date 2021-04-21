import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const zalSign = new GestureDescription('Zal_Letter');

/* 
poseData Left hand  
0: (3) ["Thumb", "No Curl", "Horizontal Left"]
1: (3) ["Index", "Half Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Left"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

poseData Right hand
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "Half Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]
*/

//Thumb (No Curl, Horizontal left/right )
zalSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
zalSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
zalSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

//Index & Middle (Half Curl, Diagonal up/left)
for (let finger of [Finger.Index, Finger.Middle]) {
  zalSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  zalSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  zalSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}
//Ring & Pinky (Full curl, Vertical up)
for (let finger of [Finger.Ring, Finger.Pinky]) {
  zalSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  zalSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  zalSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
