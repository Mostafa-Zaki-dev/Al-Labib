import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const zahSign = new GestureDescription('Zah_Letter');

/*
poseData Right hand
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]

poseData Left hand  
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]

0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "Half Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]
*/

//Thumb (No Curl, Vertical Up (best), Diagonal Up left/right)
zahSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
zahSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
zahSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.3);
zahSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.3);

//Index (No Curl, Vertical Up)
zahSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
zahSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//All other Fingers (Full Curl, Diagonal Up left/right)
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  zahSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  zahSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  zahSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}
