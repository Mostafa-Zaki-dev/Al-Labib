import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const seenSign = new GestureDescription('Seen_Letter');

/* 
0: (3) ["Thumb", "No Curl", "Vertical Up"]
1: (3) ["Index", "No Curl", "Vertical Up"]
2: (3) ["Middle", "No Curl", "Vertical Up"]
3: (3) ["Ring", "No Curl", "Vertical Up"]
4: (3) ["Pinky", "No Curl", "Vertical Up"]
*/

//All fingers (No Curl, Vertical Up)
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  seenSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  seenSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
