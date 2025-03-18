import { React, useState, useEffect } from 'react';
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
import LoginModal from '../components/modals/LoginModal';
import TopRank from '../components/TopRank.jsx';

import CreateSong from '../api/music/CreateSong';
import SaveSong from '../api/music/SaveSong';
import GetHistory from '../api/music/GetHistory';

import background from '../img/background.png';

function Create() {
  const [selectedSong, setSelectedSong] = useState(null); // index
  const [history, setHistory] = useState([]);

  const token = Cookies.get('token');

  const [isLogin, setIsLogin] = useState(null); // useless?
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // 로그인 모달
  const handleOpenModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleNoLogin = () => {
    setIsLoginModalOpen(false);
    window.location.href = '/users/login';
  };

  // 곡 생성
  const handlePromptSubmit = (inputValue) => {
    if (token === undefined) {
      handleOpenModal();
      return;
    }

    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    GetHistory(token).then((response) => {
      // console.log(response.result);
      if (response && response.isSuccess) {
        setHistory(response.result);
      }
    });
  }, []);

  useEffect(() => {
    if (!token) {
      handleOpenModal();
    }
  }, [token]);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <CreateContainer>
        <SideMenu />
        <Credit tokens={token} />
        <CreateWrapper>
          <CreateComponent
            history={history}
            selectedSong={selectedSong}
            isLoading={isLoading}
          />
          <History history={history} updateSelectedSong={setSelectedSong} />
        </CreateWrapper>
        <CreateButton
          onSubmit={handlePromptSubmit}
          onModalOpen={handleOpenModal}
        />
        <Profile />
        <TopRank />
        {isLoginModalOpen && (
          <LoginModal onClose={handleCloseModal} onGoLogin={handleNoLogin} />
        )}
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
