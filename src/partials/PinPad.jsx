import React, { useState } from 'react';
import { Button, Input, Col, Row } from 'reactstrap';
import styled from 'styled-components';

const NumButton = ({ value, clickHandler, colorOverride, className }) => {

  const [color, setColor] = useState('secondary');
  
  const mouseHandler = (evt) => {
    setColor(evt.type === 'mousedown' ? 'primary' : 'secondary');
  }

  return (
    <Button
      className={className}
      color={colorOverride ? 'primary' : color}
      onMouseDown={mouseHandler}
      onMouseUp={mouseHandler}
      onClick={clickHandler}
    >
      {value}
    </Button>
  );
};

const StyledNumButton = styled(NumButton)`
  width: calc(80vw / 4);
  height: calc(80vw / 4);
  margin-bottom: calc(80vw / 16);
  font-size: 10vmin;

  @media (orientation: landscape) {
    width: calc(30vw / 4);
    height: calc(30vw / 4);
    margin-bottom: calc(30vw / 8);
    font-size: 6vh;
  }
`;

const PinPadWrapper = styled(Row)`
  width: 80vw;
  height: 60vmax;
  align-items: center;
  position: relative;
  left: 10vw;
  top: 10vh;
  margin-left: 0;
  margin-right: 0;

  @media (orientation: landscape) {
    width: 30vw;
    left: 35vw;
  }
`;

const ButtonRow = styled(Row)`
  justify-content: space-around;
`;

const PinInput = styled(Input)`
  font-size: 8vmin;
  text-align: center;
  
  @media (orientation: landscape) {
  }
`;

const PinPad = ({ savePin }) => {
  const [pinValue, setPinValue] = useState('');

  return (
    <>
      <PinPadWrapper>
        <PinInput type='password' value={pinValue} readOnly />
        <Col>
          <ButtonRow>
            <StyledNumButton value='7' clickHandler={() => setPinValue(`${pinValue || ''}7`)} />
            <StyledNumButton value='8' clickHandler={() => setPinValue(`${pinValue || ''}8`)} />
            <StyledNumButton value='9' clickHandler={() => setPinValue(`${pinValue || ''}9`)} />
          </ButtonRow>
          <ButtonRow>
            <StyledNumButton value='4' clickHandler={() => setPinValue(`${pinValue || ''}4`)} />
            <StyledNumButton value='5' clickHandler={() => setPinValue(`${pinValue || ''}5`)} />
            <StyledNumButton value='6' clickHandler={() => setPinValue(`${pinValue || ''}6`)} />
          </ButtonRow>
          <ButtonRow>
            <StyledNumButton value='1' clickHandler={() => setPinValue(`${pinValue || ''}1`)} />
            <StyledNumButton value='2' clickHandler={() => setPinValue(`${pinValue || ''}2`)} />
            <StyledNumButton value='3' clickHandler={() => setPinValue(`${pinValue || ''}3`)} />
          </ButtonRow>
          <ButtonRow>
            <StyledNumButton value='C' clickHandler={() => setPinValue('')} />
            <StyledNumButton value='0' clickHandler={() => setPinValue(`${pinValue || ''}0`)} />
            <StyledNumButton value='➤' clickHandler={() => setPinValue(1243)} colorOverride />
          </ButtonRow>
        </Col>
      </PinPadWrapper>
    </>
  );
};

export default PinPad;