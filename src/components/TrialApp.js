import React, { useRef, useState, useEffect } from 'react';
import '@tensorflow/tfjs'; //loading Tensoflow.JS
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import Webcam from 'react-webcam';
import handSigns from '../handsigns';
import { Typography } from '@material-ui/core';
import { ThumbUp, Grade } from '@material-ui/icons';
import { useUser } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';

let pointsMemory = {};

function TrailApp() {
  const webcamRef = useRef(null);
  const [letter, setLetter] = useState(null);
  const { currentLevel } = useUser();
  const [promptArr, setPromptArr] = useState(currentLevel.promptArr);
  const [prompt, setPrompt] = useState('');
  const [gameEnd, setGameEnd] = useState(false);

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

      // setting up Gesture Estimator

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator(
          currentLevel.detect.map((handSign) => handSigns[handSign])
        );
        const gesture = await GE.estimate(hand[0].landmarks, 7.0); //GE.estimate(landmarks Array, detection level of confidence -from 1 to 10-)

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidenceArr = gesture.gestures.map((prediction) => prediction.confidence);
          const maxConfidenceIdx = confidenceArr.indexOf(Math.max(...confidenceArr));
          setLetter(gesture.gestures[maxConfidenceIdx].name);
        }
      }
    }
  };
  //display the prompt every 5 seconds
  const displayPrompt = () => {
    let i = 0;
    const interval = setInterval(() => {
      setPrompt(promptArr[i++]);
      if (i > promptArr.length) {
        clearInterval(interval);
        setGameEnd(true);
      }
    }, 5000);
  };

  useEffect(() => {
    runHandpose();
    displayPrompt();
    pointsMemory = {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (letter != null && letter === prompt) {
    pointsMemory[letter] = true;
  }
  const maxLevelPts = promptArr.length * 5;
  let totalPts = Object.keys(pointsMemory).length * 5;
  let margin = totalPts < 10 ? 15 : 8;

  //preventing LevelSummary page refreshing (reloading)

  window.onbeforeunload = function () {
    window.setTimeout(function () {
      window.location = '/dashboard';
    }, 0);
    window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
  };

  return !gameEnd ? (
    <div className="App video-container">
      <header>
        <Webcam className="video" ref={webcamRef} />
      </header>
      <div className="game-container">
        <div id="points-container">
          <div id="score">
            <Typography
              variant="h2"
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 30,
                textAlign: 'justify',
                zIndex: 10,
                marginLeft: margin,
                marginTop: 10,
              }}
            >
              {totalPts}
            </Typography>
          </div>
          <div id="score-star">
            <Grade style={{ fontSize: 100, fill: 'gold' }}></Grade>
          </div>
        </div>
        <div className="prompt-card">
          <div id="thumb-containter">
            <div>
              {letter !== '' && letter === prompt ? (
                <Typography variant="h1" style={{ color: 'gold' }}>
                  +5
                </Typography>
              ) : (
                ''
              )}
            </div>
            <div>
              {letter !== '' && letter === prompt ? (
                <ThumbUp style={{ fontSize: 100, float: 'center', color: 'gold' }} />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="prompt-box">
            <div className="prompt-content">
              <Typography variant="h6">Your GUESS: {letter}</Typography>
              <Typography variant="h2">Prompt: {prompt}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to={{ pathname: '/levelsummary', state: { totalPts, maxLevelPts } }} />
  );
}

export default TrailApp;
