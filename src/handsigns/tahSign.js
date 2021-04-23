import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const tahSign = new GestureDescription('Tah_Letter');

/*
poseData Left hand  
0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Left"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]

0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Left"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]

poseData Right hand
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]

0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "Half Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]
*/

//Thumb (No Curl, Horizontal left/right (best), Diagonal Up left/right)
tahSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
tahSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
tahSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
tahSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.2);
tahSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.2);

//Index (No Curl, Vertical Up)
tahSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
tahSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//All other Fingers (Full Curl, Diagonal Up left/right)
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  tahSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  tahSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  tahSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}
