import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

import { Header, PinPad } from '../partials';
import settings from  '../../settings.json';

// settings = JSON.parse(settings);

console.log(settings);

const Main = (props) => {

  // This is temporary. Swap with JWT at some point
  const [authenticated, setAuthenticated] = useState(true);

  const checkPin = async (pin) => {
    await fetch(`${window.origin}/api/v1/auth`, {
      method: 'POST',
      body: pin
    }).then(res => res.text()).then((msg) => {
      setAuthenticated(msg === 'matched');
    });
  }

  return authenticated ? (
    <>
      <Header />
    </>
  ) : (
    <PinPad />
  );
};

export default Main;