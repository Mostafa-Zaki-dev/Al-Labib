import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const behSign = new GestureDescription('Beh-Letter');

/* 
poseData left hand face
0: (3) ["Thumb", "Half Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

poseData righ hand face
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Full Curl", "Vertical Up"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

poseData left hand side 
0: (3) ["Thumb", "No Curl", "Diagonal Up Left"]
1: (3) ["Index", "No Curl", "Diagonal Up Left"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Left"]
3: (3) ["Ring", "Full Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Left"]

poseData righ hand side 
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "No Curl", "Diagonal Up Right"]
2: (3) ["Middle", "Full Curl", "Diagonal Up Right"]
3: (3) ["Ring", "Full Curl", "Diagonal Up Right"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]
*/

//Thumb (Half curl (best) or no curl, Vertical up (best) or diagonal up left/right
behSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
behSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.7);
behSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
behSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7);
behSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//Index (No curl, Vertical up (best) or diagonal up left /righ )
behSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
behSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
behSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7);
behSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);

//All other fingers (full Curl, Vertical up (best) or diagonal up left/right)

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  behSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  behSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  behSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7);
  behSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);
}
