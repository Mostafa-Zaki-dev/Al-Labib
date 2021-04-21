import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const haaSign = new GestureDescription('Haa_Letter');

//Thumb (No curl, Vertical up)
haaSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
haaSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

//All other fingers (No curl, diagonal up left/right)
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  haaSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  haaSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  haaSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}
