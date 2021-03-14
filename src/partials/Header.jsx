import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  height: 8vh;
  background-color: var(--primary);
`;

const Header = ({ houseName }) => (
  <StyledHeader>
    <h1>{houseName || 'The Portal'}</h1>
  </StyledHeader>
);

export default Header;