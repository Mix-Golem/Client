import React, { useState, useEffect, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../styles/Theme';
import GlobalStyle from '../styles/GlobalStyle';
import Cookies from 'js-cookie';

import Mypage from '../components/modals/Mypage.jsx';
import SideMenu from '../components/SideMenu';
import LibraryComponent from '../components/LibraryComponent';
import Lyrics from '../components/Lyrics';
import Follow from '../components/Follow';
import Profile from '../components/Profile';
import Credit from '../components/Credit';
import TopRank from '../components/TopRank.jsx';

import GetMySong from '../api/music/GetMySong.js';
import GetAllPlaylist from '../api/music/GetAllPlaylist.js';
import GetFollowList from '../api/social/GetFollowList.js';

import background from '../img/background.png';
import Album1 from '../img/Album1.svg';
import Icon_MyPlayList from '../img/playlist.svg';
import User from '../img/user.svg';

const Library = () => {
  // api response 저장용
  const FullSonglist = useState([]);
  const FullPlaylist = useState([]);
  const [songlist, setSonglist] = useState([
    {
      src: Album1,
      title: '시흥 밤바다',
      artist: '박스 깎는 노인',
      thumbnail: Album1,
      lyrics:
        '1[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게\n\n[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게',
    },
    {
      id: 2,
      title: '샤코 엔딩',
      artist: '박스 깎는 노인',
      thumbnail: Album1,
      lyrics:
        '2[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게\n\n[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게',
    },
    {
      id: 3,
      title: '다이아를 향한 갈망',
      artist: '박스 깎는 노인',
      thumbnail: Album1,
      lyrics:
        '3[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게\n\n[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게',
    },
    {
      id: 4,
      title: '코딩 싫어',
      artist: '부따트롤주의',
      thumbnail: Album1,
      lyrics:
        '4[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게\n\n[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게',
    },
  ]);
  const [playlist, setPlaylist] = useState([
    { id: 1, title: 'Playlist 1', thumbnail: Icon_MyPlayList },
    { id: 2, title: 'Playlist 2', thumbnail: Icon_MyPlayList },
    { id: 3, title: 'Playlist 3', thumbnail: Icon_MyPlayList },
    { id: 4, title: 'Playlist 4', thumbnail: Icon_MyPlayList },
  ]);
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [followlist, setFollowlist] = useState({
    followingList: [],
    followerList: [],
  });
  const [followingDiff, setFollwingDiff] = useState(0);
  const token = Cookies.get('token');

  const updateSonglist = () => {
    GetMySong(token).then((response) => {
      if (response.isSuccess) {
        setSonglist(response.result);
      }
    });
  };

  const updatePlaylist = () => {
    GetAllPlaylist(token).then((response) => {
      if (response.isSuccess) {
        setPlaylist(response.result);
      }
    });
  };

  const updateSelectedLyrics = (newLyrics) => {
    setSelectedLyrics(newLyrics);
  };

  const updateFollowlist = () => {
    GetFollowList(token).then((response) => {
      if (response.isSuccess) {
        setFollowlist(response.result);
      }
    });
  };

  const updateFollowingNum = (diff) => {
    setFollwingDiff(followingDiff + diff);
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    GetMySong(token).then((response) => {
      // console.log(response.isSuccess);
      if (response.isSuccess) {
        // console.log(response.result);
        setSonglist(response.result);
      }
    });

    GetAllPlaylist(token).then((response) => {
      console.log(response.isSuccess);
      if (response.isSuccess) {
        console.log(response.result);
        setPlaylist(response.result);
      }
    });

    GetFollowList(token).then((response) => {
      if (response.isSuccess) {
        setFollowlist(response.result);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <LibraryContainer>
        <SideMenu />
        <Credit />
        <LibraryWrapper>
          <LibraryComponent
            songlist={songlist}
            playlist={playlist}
            followerlist={followlist}
            updateSelectedLyrics={updateSelectedLyrics}
            updateSonglist={updateSonglist}
            updatePlaylist={updatePlaylist}
            updateFollowlist={updateFollowlist}
            updateFollowingNum={updateFollowingNum}
          />
          <Lyrics lyrics={selectedLyrics} />
        </LibraryWrapper>
        <Follow followlist={followlist} followingDiff={followingDiff} />
        <Mypage show={showModal} onClose={toggleModal} />
        <TopRank/>
        <Profile />
      </LibraryContainer>
    </ThemeProvider>
  );
};

export default Library;

const LibraryContainer = styled.div`
  /* position: fixed; */
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: ${Theme.colors.darkGray};
  overflow-y: auto;
`;

const LibraryWrapper = styled.div`
  margin-top: 47px;
  /* display: flex; */
  position: relative;
  /* overflow: visible; */
  z-index: 1;
  width: 1571px;
  height: 1000px;
  margin-left: 45px;

  -webkit-mask-image: url(${background});
  mask-image: url(${background});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  background-image: url(${background});
  background-size: cover;
  background-position: 50% 50%;

  z-index: 0;
`;
