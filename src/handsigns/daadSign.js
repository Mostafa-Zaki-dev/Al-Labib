import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const daadSign = new GestureDescription('ض');

/*
poseData Left hand  
0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "Full Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

poseData Right hand
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "Full Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]
*/

//Thumb (No Curl, Diagonal Up left/right)
daadSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
daadSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
daadSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
daadSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.4);
daadSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.3);

//Index & Middle (Full Curl, Diagonal Up left/right)
for (let finger of [Finger.Index, Finger.Middle]) {
  daadSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  daadSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  daadSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  daadSign.addDirection(finger, FingerDirection.VerticalUp, 0.3);
}

//Ring & Pinky (Full Curl, Vertical Up)
for (let finger of [Finger.Ring, Finger.Pinky]) {
  daadSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  daadSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  daadSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.3);
  daadSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.3);
}
