import React from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';

const CreateComponent = () => {
  // Your component logic here

  return <ContentsWrapper>{/* Your JSX code here */}</ContentsWrapper>;
};

export default CreateComponent;

const ContentsWrapper = styled.div`
  position: absolute;
  margin-left: 41px;
  top: 23px;
  width: 744px;
  height: 663px;
  overflow: hidden;
  background: ${Theme.colors.black};
  border-radius: 20px;
`;
