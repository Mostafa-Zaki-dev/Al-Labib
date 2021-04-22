import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const saadSign = new GestureDescription('Saad_Letter');

/*
poseData Left hand  
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "Full Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]

poseData Right hand
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "Full Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]
*/

//Thumb (No Curl, Vertical Up)
saadSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
saadSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

//Index & Pinky (Full Curl, Diagonal Up left/right)
for (let finger of [Finger.Index, Finger.Pinky]) {
  saadSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  saadSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  saadSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

//Middle & Ring (Full Curl, Vertical Up)
for (let finger of [Finger.Middle, Finger.Ring]) {
  saadSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  saadSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
