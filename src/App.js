import React, { useRef, useState } from 'react';
// import logo from './logo.svg';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import './App.css';
import { drawHand } from './utilities';
import * as fp from 'fingerpose';
import handSigns from './handsigns';
import { tehSign } from './handsigns/tehSign';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('Handpose model loaded.');
    //  Loop and detect hands
    setInterval(() => {
      // console.log('Looking for a hand to detect');
      detect(net);
    }, 150);
  };

  runHandpose();

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

      // Set canvas height and width

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections

      const hand = await net.estimateHands(video);
      // console.log('hand detection:  ', hand);

      // setting up Gesture Estimator

      if (hand.length > 0) {
        const { alefSign, behSign, tehSign, thehSign } = handSigns;
        const GE = new fp.GestureEstimator([alefSign, behSign, tehSign, thehSign]);
        const gesture = await GE.estimate(hand[0].landmarks, 7); //GE.estimate(landmarks Array, detection level of confidence -from 1 to 10-)
        console.log('gesture', gesture);
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext('2d');
      drawHand(hand, ctx);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
