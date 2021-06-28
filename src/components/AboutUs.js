import React from 'react';
import { Button, Typography } from '@material-ui/core';

function AboutUs() {
  return (
    <>
      <div className="centerme">
        <div className="logo">
          <img
            src="/appLogo.png"
            alt="Al-Labib Logo"
            style={{
              height: 110,
              width: 110,
            }}
          />
        </div>
        <br />
        <div className="landingbody">
          <Typography variant="h3" color={'primary'}>
            ABOUT US
          </Typography>
          <br />
          <div style={{ maxWidth: 700 }}>
            <Typography
              variant="h6"
              style={{ paddingLeft: '10%', paddingRight: '10%', fontSize: 16 }}
            >
              Al-Labib App goal is to break through the communication barriers between hearing and
              non-hearing people. Making the sign language a fun and easy game to learn and play.
            </Typography>
            <br />
            <Typography
              variant="h6"
              color={'primary'}
              style={{ paddingLeft: '10%', paddingRight: '10%', fontSize: 16 }}
            >
              Launched In: June 2021
            </Typography>
            <Typography
              variant="h6"
              color={'primary'}
              style={{ paddingLeft: '10%', paddingRight: '10%', fontSize: 16 }}
            >
              Developed By: Mostafa Zaki
            </Typography>
          </div>
          <br />
          <div>
            <a href="/">
              <Button variant="outlined" color="primary">
                Back
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
