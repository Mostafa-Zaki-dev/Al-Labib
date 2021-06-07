import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { ThumbUp, Grade } from '@material-ui/icons';
import { useUser } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import { bounceInUp } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const BounceUp = styled.div`
  animation: 1s ${keyframes`${bounceInUp}`};
`;

let pointsMemory = {};
let i = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function GameText() {
  const { currentLevel } = useUser();
  const { promptArr, pictureArr } = currentLevel;
  const combinedPromptArr = promptArr.map((prompt, i) => ({
    letter: prompt,
    picture: pictureArr[i],
  }));
  const [textPromptArr, setTextPromptArr] = useState(shuffle(combinedPromptArr));
  const [textPrompt, setTextPrompt] = useState(textPromptArr[0]);
  const [thumb, setThumb] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const userAnswerRef = useRef();

  function checkAnswer(answer) {
    if (answer === textPrompt.letter) {
      setThumb(true);
      pointsMemory[textPrompt.letter] = true;
      setTextPrompt(textPromptArr[++i]);
      setTimeout(() => setThumb(false), 1000);
    } else if (answer !== textPrompt.letter) {
      setTextPrompt(textPromptArr[++i]);
    }
    if (i >= textPromptArr.length) {
      setGameEnd(true);
    }
    userAnswerRef.current.value = '';
  }

  function handleSubmit() {
    checkAnswer(userAnswerRef.current.value.toUpperCase().trim());
  }

  useEffect(() => {
    return () => {
      pointsMemory = {};
      i = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxLevelPts = textPromptArr.length * 5;
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
    <div className="centerme">
      <div className="game-container" style={{ position: 'relative', top: -100 }}>
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
        <div
          className="prompt-card"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div id="thumb-containter" style={{ position: 'absolute', zIndex: 10 }}>
            <div>
              {thumb ? (
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
              {thumb ? (
                <BounceUp>
                  <ThumbUp style={{ fontSize: 100, float: 'center', color: 'gold' }} />
                </BounceUp>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="prompt-box" style={{ backgroundColor: '#e3f2fd', opacity: 0.85 }}>
            <div
              className="prompt-content"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <>
                {textPrompt ? (
                  <img
                    src={textPrompt.picture}
                    alt={textPrompt.letter}
                    style={{ height: 150, width: 150 }}
                  />
                ) : (
                  ''
                )}
                <TextField
                  type="text"
                  label="Your Answer"
                  inputRef={userAnswerRef}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                  }}
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to={{ pathname: '/levelsummary', state: { totalPts, maxLevelPts } }} />
  );
}

export default GameText;
