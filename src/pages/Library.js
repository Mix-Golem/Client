import React, { useState } from "react";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import Lyrics from "../components/Lyrics";
import { Theme } from "../styles/Theme";

import Frame from "../img/Frame.svg";
import Img_Credit from "../img/Img_Credit.svg";
import Album1 from "../img/Album1.svg";

const Library = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedLyrics, setSeletedLyrics] = useState(null);
  const handleItemClick = (index) => {
    setSelectedItem(index);
    console.log(songList[index].lyrics);
    setSeletedLyrics(songList[index].lyrics);
  };

  const songList = [
    {
      src: Album1,
      title: "시흥 밤바다",
      artist: "박스 깎는 노인",
      lyrics:
        "1[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게\n\n[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게",
    },
    {
      src: Album1,
      title: "샤코 엔딩",
      artist: "박스 깎는 노인",
      lyrics:
        "2[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게\n\n[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게",
    },
    {
      src: Album1,
      title: "다이아를 향한 갈망",
      artist: "박스 깎는 노인",
      lyrics:
        "3[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게\n\n[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게",
    },
    {
      src: Album1,
      title: "코딩 싫어",
      artist: "부따트롤주의",
      lyrics:
        "4[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게\n\n[Verse]\n시흥의 밤바다 눈부신 별빛\n조용히 흐르는 파도 소리\n고요한 이 밤에 마음이 울려\n숨 쉬는 것 같아 나의 꿈들이\n\n[Verse 2]\n은빛 물결 따라 생각이 흘러\n작은 바람도 내 마음 안아\n바다 냄새 속에 추억이 떠올라\n단 한 번의 미소로 다시 살아나\n\n[Chorus]\n시흥의 밤바다 나를 부르는 소리\n깊은 어둠 속에 비치는 별빛\n더 멀리 떨어져도 느낄 수 있는\n너와 나의 꿈들 잊지 않을게",
    },
  ];

  return (
    <LibraryContainer>
      <SideWrapper>
        <SideMenu />
        <Credit>
          <img src={Img_Credit} alt="" />
          <p>50 Credits</p>
        </Credit>
      </SideWrapper>
      <LibraryWrapper>
        <ContentsWrapper>
          <ContentsTitle>Library</ContentsTitle>
          <ContentsMenu>
            <button>My Song</button>
            <button>PlayList</button>
            <button>Following</button>
            <button>Followers</button>
          </ContentsMenu>
          <ContentsListWrapper>
            {songList.map((value, index) => (
              <ContentsList
                as="button"
                key={index}
                onClick={() => handleItemClick(index)}
                isSelected={index === selectedItem}
              >
                <img src={value.src} alt="Song" />
                <SongInfo>
                  <p>{value.title}</p>
                  <p>{value.artist}</p>
                </SongInfo>
              </ContentsList>
            ))}
          </ContentsListWrapper>
        </ContentsWrapper>
        <Lyrics lyrics={selectedLyrics} />
      </LibraryWrapper>
    </LibraryContainer>
  );
};

export default Library;

const LibraryContainer = styled.div`
  position: fixed;
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

  /* background: ${Theme.colors.lightGray};
  border-radius: 20px; */

  background-image: url(${Frame});
`;

// 그라데이션 박스
const GradientBox = styled.div`
  background: linear-gradient(180deg, #666666 1.13%, #000000 25.35%);
  border-radius: 20px;
`;

const ContentsWrapper = styled(GradientBox)`
  position: absolute;
  margin-left: 41px;
  top: 23px;
  width: 744px;
  height: 663px;

  overflow-x: hidden;
  /* overflow-y: hidden; */
`;

const ContentsTitle = styled.p`
  position: relative;
  display: flex;
  margin: 0px;
  left: 32px;
  width: auto;
  height: 84px;
  ${Theme.fonts.title}
  color: ${Theme.colors.white};

  align-items: center;
`;

// nav menu list
const ContentsMenu = styled.ul`
  margin: 0px;
  margin-bottom: 46px;
  padding-left: 32px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    margin-right: 38px;
    background: none;
    border: none;
    ${Theme.fonts.list}
    color: ${Theme.colors.white};

    &:hover {
      transition: 0.3s;
      color: ${Theme.colors.lightBlue};
    }

    // test
    &:active {
      color: ${Theme.colors.red};
    }
  }
`;

const ContentsListWrapper = styled.div`
  height: 490px;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

// 수록곡 갯수만큼 props로 albumImg, title, artist 넘겨주면 될 듯
const ContentsList = styled.div`
  display: flex;
  width: 744px;
  height: 163px;
  background: ${(props) =>
    props.isSelected
      ? "linear-gradient(270deg, #D9D9D9 28.08%, #81D8F3 100%)"
      : "black"};
  border-style: none;

  img {
    margin-left: 42px;
    width: 120px;
    height: 120px;
    border-radius: 20px;
    object-fit: fill;
    align-self: center;
  }
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 38px;

  p {
    justify-content: left;
    text-align: left;

    &:nth-child(1) {
      margin-top: 31px;
      margin-bottom: 0px;
      ${Theme.fonts.songTitle}
      color: ${Theme.colors.white};
    }

    &:nth-child(2) {
      ${Theme.fonts.songArtist}
      color: ${Theme.colors.gray};
    }
  }
`;
