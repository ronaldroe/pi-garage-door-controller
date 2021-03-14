import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

import { Header, PinPad } from '../partials';

const Main = (props) => {

  const [authenticated, setAuthenticated] = useState(false);

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
      <h1>Hello, world!</h1>
      <Button color='primary'>TEST BUTTON</Button>
    </>
  ) : (
    <PinPad />
  );
};

export default Main;