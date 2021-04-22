import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const tehSign = new GestureDescription('Teh_Letter');

/* 
poseData right hand face 
0: (3) ["Thumb", "Half Curl", "Diagonal Up Left"]
1: (3) ["Index", "No Curl", "Diagonal Up Right"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]

poseData left hand face
0: (3) ["Thumb", "Half Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Diagonal Up Left"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]

*/

//Thumb (Half curl, Diagonal up left/right (best) or Vertical up)
tehSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
tehSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
tehSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
tehSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.4);

//Index (No curl, Vertical up (best) or diagonal up left /right )
tehSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
tehSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
tehSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.4);
tehSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.4);

//Middle (No curl, Vertical up)
tehSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
tehSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring & Pinky (full Curl, Vertical up (best) or diagonal up left/right)

for (let finger of [Finger.Ring, Finger.Pinky]) {
  tehSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  tehSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  tehSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.25);
  tehSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.25);
}
