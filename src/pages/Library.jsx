import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Mypage from '../components/modals/Mypage.jsx';
import SideMenu from '../components/SideMenu';
import LibraryComponent from '../components/LibraryComponent';
import Lyrics from '../components/Lyrics';
import Follow from '../components/Follow';
import { Theme } from '../styles/Theme';
import GetMySong from '../api/music/GetMySong.js';
import GetAllPlaylist from '../api/music/GetAllPlaylist.js';
import GetFollowList from '../api/social/GetFollowList.js';

import Frame from '../img/Frame.svg';
import Img_Credit from '../img/Img_Credit.svg';
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

  const updateSonglist = () => {
    GetMySong().then((response) => {
      if (response.isSuccess) {
        setSonglist(response.result);
      }
    });
  };

  const updatePlaylist = () => {
    GetAllPlaylist().then((response) => {
      if (response.isSuccess) {
        setPlaylist(response.result);
      }
    });
  };

  const updateSelectedLyrics = (newLyrics) => {
    setSelectedLyrics(newLyrics);
  };

  const updateFollowlist = (newFollowlist) => {
    setFollowlist(newFollowlist).then((response) => {
      if (response.isSuccess) {
        setSonglist(response);
      }
    });
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    GetMySong().then((response) => {
      // console.log(response.isSuccess);
      if (response.isSuccess) {
        // console.log(response.result);
        setSonglist(response.result);
      }
    });

    GetAllPlaylist().then((response) => {
      console.log(response.isSuccess);
      if (response.isSuccess) {
        console.log(response.result);
        setPlaylist(response.result);
      }
    });

    GetFollowList().then((response) => {
      if (response.isSuccess) {
        setFollowlist(response.result);
      }
    });
  }, []);

  return (
    <LibraryContainer>
      <SideWrapper>
        <SideMenu />
        <Credit onClick={toggleModal}>
          {' '}
          <img src={Img_Credit} alt='' />
          <p>50 Credits</p>
        </Credit>
      </SideWrapper>
      <LibraryWrapper>
        <LibraryComponent
          songlist={songlist}
          playlist={playlist}
          followerlist={followlist}
          updateSelectedLyrics={updateSelectedLyrics}
          updateSonglist={updateSonglist}
          updatePlaylist={updatePlaylist}
          updateFollowlist={updateFollowlist}
        />
        <Lyrics lyrics={selectedLyrics} />
        <Follow followlist={followlist} />
      </LibraryWrapper>
      <Mypage show={showModal} onClose={toggleModal} />{' '}
    </LibraryContainer>
  );
};

export default Library;

const LibraryContainer = styled.div`
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

const LibraryWrapper = styled.div`
  position: relative;
  width: 1571px;
  height: 1001px;
  left: 45px;
  top: 47px;

  background-image: url(${Frame});
`;
