import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const thehSign = new GestureDescription('Theh_Letter');

/* 
poseData right hand face 
0: (3) ["Thumb", "Half Curl", "Diagonal Up Left"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "No Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]

poseData left hand face
0: (3) ["Thumb", "No Curl", "Diagonal Up Right"]
1: (3) ["Index", "No Curl", "Diagonal Up Left"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "No Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

0: (3) ["Thumb", "Half Curl", "Diagonal Up Right"]
1: (3) ["Index", "No Curl", "Diagonal Up Left"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "No Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Vertical Up"]

poseData left hand angle
0: (3) ["Thumb", "Half Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "No Curl", "Vertical Up"]
4: (3) ["Pinky", "Half Curl", "Vertical Up"]

poseData right hand angle
0: (3) ["Thumb", "Half Curl", "Diagonal Up Left"]
1: (3) ["Index", "No Curl", "Diagonal Up Right"]
2: (3) ["Middle", "No Curl", "Diagonal Up Right"]
3: (3) ["Ring", "No Curl", "Vertical Up"]
4: (3) ["Pinky", "Full Curl", "Diagonal Up Right"]
*/

//Thumb (Half curl, diagonal up left/right (best) or Vertical up)
thehSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
// thehSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.4);
thehSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
thehSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

//Index (No curl, Vertical up (best) or diagonal up left /right )
thehSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
thehSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
thehSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.4);
thehSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.4);

//Middle & Ring (No Curl, Vertical up (best) or diagonal up left/right)
for (let finger of [Finger.Middle, Finger.Ring]) {
  thehSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  thehSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  // thehSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.25);
  // thehSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.25);
}

//Pinky (Full curl, Vertical up (best) or diagonal up left /righ )
thehSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
thehSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
thehSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.25);
thehSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.25);
