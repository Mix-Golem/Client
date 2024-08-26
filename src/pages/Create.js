import React from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import SideMenu from '../components/SideMenu';
import CreateComponent from '../components/CreateComponent';
import History from '../components/History';

import Frame from '../img/Frame.svg';
import Img_Credit from '../img/Img_Credit.svg';

function Create() {
  return (
    <CreateContainer>
      <SideWrapper>
        <SideMenu />
        <Credit>
          <img src={Img_Credit} alt='Credits' />
          <p>50 Credits</p>
        </Credit>
      </SideWrapper>
      <CreateWrapper>
        <CreateComponent />
        <History />
      </CreateWrapper>
    </CreateContainer>
  );
}

export default Create;

const CreateContainer = styled.div`
  /* position: fixed; */
  position: absolute;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: ${Theme.colors.darkGray};
`;

const SideWrapper = styled.div`
  position: relative;
  display: flex;
  width: 249px;
  height: 1010px;
  left: 18px;
  top: 38px;

  flex-direction: column;
  justify-content: space-between;
`;

const Credit = styled.div`
  display: flex;
  width: 249px;
  height: 93px;
  background: ${Theme.colors.black};
  border-radius: 70px;

  justify-content: center;
  align-items: center;

  img {
    margin-right: 12px;
  }

  p {
    ${Theme.fonts.credit}
    color: ${Theme.colors.white};
  }
`;

const CreateWrapper = styled.div`
  position: relative;
  width: 1571px;
  height: 1001px;
  left: 45px;
  top: 47px;

  background-image: url(${Frame});
`;
