import React, { useRef, useState, useEffect } from 'react';
import '@tensorflow/tfjs'; //loading Tensoflow.JS
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import Webcam from 'react-webcam';
import handSigns from '../handsigns';
import { Typography } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';

let importedLetters = ['Alef_Letter', 'Beh_Letter', 'Teh_Letter', 'Theh_Letter'];

function TrailApp() {
  const webcamRef = useRef(null);
  const [letter, setLetter] = useState(null);
  // const [points, setPoints] = useState(0);
  const [promptArr, setPromptArr] = useState(importedLetters);
  const [prompt, setPrompt] = useState('');

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('Handpose model loaded.');
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available

    /* video.readyState === 4 indicates HAVE_ENOUGH_DATA */

    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;

      // Get Video Properties

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video width

      video.width = videoWidth;
      video.height = videoHeight;

      // Make Detections

      const hand = await net.estimateHands(video);
      // console.log('hand detection:  ', hand);

      // setting up Gesture Estimator

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator(
          Object.keys(handSigns).map((handSign) => handSigns[handSign])
        );
        const gesture = await GE.estimate(hand[0].landmarks, 8.0); //GE.estimate(landmarks Array, detection level of confidence -from 1 to 10-)
        // console.log('gesture >>>', gesture);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log('gesture.gestures >>>>', gesture.gestures);

          const confidenceArr = gesture.gestures.map((prediction) => prediction.confidence);
          const maxConfidenceIdx = confidenceArr.indexOf(Math.max(...confidenceArr));
          // console.log('maxConfidenceIdx >>>', maxConfidenceIdx);
          // console.log('name of maxConfidence  >>',  gesture.gestures[maxConfidenceIdx].name);
          setLetter(gesture.gestures[maxConfidenceIdx].name);
        }
      }
    }
  };
  //display the prompt every 5 seconds
  const displayPrompt = () => {
    let i = 0;
    // const interval =
    setInterval(() => {
      setPrompt(promptArr[i++]);
    }, 5000);
  };

  useEffect(() => {
    runHandpose();
    displayPrompt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App video-container">
      <header>
        <Webcam className="video" ref={webcamRef} />
      </header>

      <div className="prompt-card">
        <div>
          <div>
            {letter !== '' && letter === prompt ? (
              <ThumbUp color="primary" style={{ fontSize: 100, float: 'center' }} />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="prompt-box">
          <div className="prompt-content">
            <Typography id="gesture-guess" fontWeight="fontWeightBold">
              Your GUESS: {letter}
            </Typography>
            <Typography variant="h2">Prompt: {prompt}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrailApp;
