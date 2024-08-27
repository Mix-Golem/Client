import React from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import SideMenu from '../components/SideMenu';
import CreateComponent from '../components/CreateComponent';
import History from '../components/History';

import Frame from '../img/Frame.svg';
import Img_Credit from '../img/Img_Credit.svg';

function Create() {
  const [selectedSong, setSelectedSong] = React.useState(null);
  const [history, setHistory] = React.useState([
    {
      status: 'OK',
      code: 200,
      message: '히스토리 호출 완료',
      result: [
        {
          id: 1,
          userId: 1,
          userName: '곡 작성자',
          title: '수정한 제목',
          thumbnail: '저장된 url',
        },
      ],
      // 등 여러개
      // 곡 id 기반으로 곡 정보 클릭시 해당 곡 정보 불러와야 함
      isSuccess: true,
    },
  ]);

  const updateSelectedSong = (newSong) => {
    setSelectedSong(newSong);
  };

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
        <History history={history[0].result} />
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
