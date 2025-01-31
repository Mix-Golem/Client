import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../styles/Theme';
import GlobalStyle from '../styles/GlobalStyle';
import Cookies from 'js-cookie';

import SideMenu from '../components/SideMenu';
import CreateComponent from '../components/CreateComponent';
import History from '../components/History';
import CreateButton from '../components/CreateButton';
import Profile from '../components/Profile';
import Credit from '../components/Credit';

import CreateSong from '../api/music/CreateSong';
import SaveSong from '../api/music/SaveSong';
import GetHistory from '../api/music/GetHistory';

import background from '../img/background.png';

function Create() {
  const [selectedSong, setSelectedSong] = React.useState(null); // index
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

  const token = Cookies.get('token');

  // 곡 생성
  const handlePromptSubmit = (inputValue) => {
    if (token === undefined) {
      // 로그인 필요하다는 모달 띄우기
      return;
    }

    CreateSong(inputValue, token)
      .then((response) => {
        console.log(response);
        if (response.isSuccess) {
          console.log('Song created successfully:', response.result);
          const songInfo = {
            title: response.result.title,
            about: '곡 소개',
            prompt: response.result.prompt,
            media: response.result.audio,
            genre: response.result.tags,
            thumbnail: response.result.image,
            lyrics: [
              {
                startTime: '시작시간',
                endTime: '종료시간',
                content: response.result.lyric,
              },
            ],
          };
          SaveSong(songInfo, token).then((response) => {
            console.log('Song creation success');
            GetHistory(token).then((response) => {
              // console.log(response.result);
              if (response.isSuccess) {
                setHistory(response.result);
              }
            });
          });
        } else {
          console.error('Song creation failed:', response.message);
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  useEffect(() => {
    GetHistory(token).then((response) => {
      // console.log(response.result);
      if (response.isSuccess) {
        setHistory(response.result);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <CreateContainer>
        <SideMenu />
        <Credit tokens={token} />
        <CreateWrapper>
          <CreateComponent history={history} selectedSong={selectedSong} />
          <History history={history} updateSelectedSong={setSelectedSong} />
        </CreateWrapper>
        <CreateButton onSubmit={handlePromptSubmit} />
        <Profile />
      </CreateContainer>
    </ThemeProvider>
  );
}

export default Create;

const CreateContainer = styled.div`
  /* position: fixed; */
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: ${Theme.colors.darkGray};
  overflow-y: auto;
`;

const CreateWrapper = styled.div`
  position: relative;
  width: 1571px;
  height: 1001px;
  left: 45px;
  top: 47px;

  -webkit-mask-image: url(${background});
  mask-image: url(${background});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  background-image: url(${background});
  background-size: cover;
  background-position: 50% 50%;
`;
