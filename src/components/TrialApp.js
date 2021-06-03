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
import { bounceInUp } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const BounceUp = styled.div`
  animation: 1s ${keyframes`${bounceInUp}`};
`;

let pointsMemory = {};

function TrailApp() {
  const webcamRef = useRef(null);
  const [letter, setLetter] = useState(null);
  const { currentLevel, difficulty } = useUser();
  const [promptArr, setPromptArr] = useState(currentLevel.promptArr);
  const [pictureArr, setPictureArr] = useState(currentLevel.pictureArr);
  const [prompt, setPrompt] = useState('');
  const [picture, setPicture] = useState('');
  const [gameEnd, setGameEnd] = useState(false);
  const [wave, setWave] = useState(false);

  // console.log('App rendered');
  // console.log('prompt: >>', prompt);

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
        if (difficulty === 'learn') {
          if (!wave) {
            setWave(true);
          }
        }
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
      if (difficulty === 'learn') {
        if (wave) {
          console.log('if(wave) >>> excuted');
          setPicture(pictureArr[i]);
          setPrompt(promptArr[i++]);
        }
      } else if (difficulty === 'practice' || difficulty === 'text') {
        setPrompt(promptArr[i++]);
      }
      if (i > promptArr.length) {
        clearInterval(interval);
        setGameEnd(true);
      }
    }, 5000);
  };

  useEffect(() => {
    displayPrompt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wave]);

  useEffect(() => {
    runHandpose();
    return () => {
      pointsMemory = {};
      setWave(false);
    };
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
                <BounceUp>
                  <Typography variant="h1" style={{ color: 'gold' }}>
                    +5
                  </Typography>
                </BounceUp>
              ) : (
                ''
              )}
            </div>
            <div>
              {letter !== '' && letter === prompt ? (
                <BounceUp>
                  <ThumbUp style={{ fontSize: 100, float: 'center', color: 'gold' }} />
                </BounceUp>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="prompt-box">
            {difficulty !== 'learn' ? (
              <div className="prompt-content">
                <Typography variant="h6" color="secondary">
                  Detected: {letter}
                </Typography>
                <Typography variant="h4" color="primary">
                  Hand sign for: {prompt}
                </Typography>
              </div>
            ) : (
              <div
                className="prompt-content"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {!wave ? (
                  <>
                    <Typography variant="h5" style={{ fontWeight: 'bold', justifyItems: 'center' }}>
                      Match the signs and learn
                    </Typography>
                    <div className="break" />
                    <Typography variant="h6">-Wave your hand to start-</Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h2">{prompt}</Typography>
                    <img id="img-learn" src={picture} alt={prompt} style={{ marginLeft: 20 }} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to={{ pathname: '/levelsummary', state: { totalPts, maxLevelPts } }} />
  );
}

export default TrailApp;
