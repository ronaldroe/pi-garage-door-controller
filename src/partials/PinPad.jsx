import React, { useState } from 'react';
import { Button, Input, Col, Row } from 'reactstrap';
import styled from 'styled-components';

const NumButton = ({ value, clickHandler, colorOverride }) => {

  const [color, setColor] = useState('secondary');
  
  const mouseHandler = (evt) => {
    setColor(evt.type === 'mousedown' ? 'primary' : 'secondary');
  }

  return (
    <Button
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
  width: calc(80vw / 3);
  height: calc(80vw / 3);

  @media (orientation: landscape) {
    width: 10vw;
    height: 10vw;
  }
`;

const PinPadWrapper = styled(Row)`
  width: 80vw;
  position: relative;
  left: 10vw;

  @media (orientation: landscape) {
    width: 30vw;
    left: 35vw;
  }
`;

const PinPad = ({ savePin }) => {
  const [pinValue, setPinValue] = useState('');

  return (
    <>
      <PinPadWrapper>
        <Input type='password' value={pinValue} readOnly />
        <Col>
          <Row>
            <StyledNumButton value='7' clickHandler={() => setPinValue(`${pinValue || ''}7`)} />
            <StyledNumButton value='8' clickHandler={() => setPinValue(`${pinValue || ''}8`)} />
            <StyledNumButton value='9' clickHandler={() => setPinValue(`${pinValue || ''}9`)} />
          </Row>
          <Row>
            <StyledNumButton value='4' clickHandler={() => setPinValue(`${pinValue || ''}4`)} />
            <StyledNumButton value='5' clickHandler={() => setPinValue(`${pinValue || ''}5`)} />
            <StyledNumButton value='6' clickHandler={() => setPinValue(`${pinValue || ''}6`)} />
          </Row>
          <Row>
            <StyledNumButton value='1' clickHandler={() => setPinValue(`${pinValue || ''}1`)} />
            <StyledNumButton value='2' clickHandler={() => setPinValue(`${pinValue || ''}2`)} />
            <StyledNumButton value='3' clickHandler={() => setPinValue(`${pinValue || ''}3`)} />
          </Row>
          <Row>
            <StyledNumButton value='C' clickHandler={() => setPinValue('')} />
            <StyledNumButton value='0' clickHandler={() => setPinValue(`${pinValue || ''}0`)} />
            <StyledNumButton value='➤' clickHandler={() => setPinValue(1243)} colorOverride />
          </Row>
        </Col>
      </PinPadWrapper>
    </>
  );
};

export default PinPad;