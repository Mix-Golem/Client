import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import Lyrics from "../components/Lyrics";
import { Theme } from "../styles/Theme";

import Frame from "../img/Frame.svg";
import Img_Credit from "../img/Img_Credit.svg";
import Album1 from "../img/Album1.svg";
import Icon_CreatePlayList from "../img/playlist_new.svg";
import Icon_MyPlayList from "../img/playlist.svg";

const Library = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [activeScreen, setActiveScreen] = useState("MySong");
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const dropdownRef = useRef(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
    setSelectedLyrics(songList[index].lyrics);
  };

  const handleButtonClick = (screen) => {
    setActiveScreen(screen);
    setSelectedItem(null);
    setSelectedLyrics(null);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleOptionClick = (option, index) => {
    setDropdownIndex(null);
    // Add functionality for each option here
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const playlist = [
    { title: "Playlist 1", src: Icon_MyPlayList },
    { title: "Playlist 2", src: Icon_MyPlayList },
    { title: "Playlist 3", src: Icon_MyPlayList },
    { title: "Playlist 4", src: Icon_MyPlayList },
  ];

  return (
    <LibraryContainer>
      <SideWrapper>
        <SideMenu />
        <Credit>
          <img src={Img_Credit} alt="Credits" />
          <p>50 Credits</p>
        </Credit>
      </SideWrapper>
      <LibraryWrapper>
        <ContentsWrapper>
          <ContentsTitle>Library</ContentsTitle>
          <ContentsMenu>
            <button onClick={() => handleButtonClick("MySong")}>My Song</button>
            <button onClick={() => handleButtonClick("Playlist")}>
              PlayList
            </button>
            <button onClick={() => handleButtonClick("Following")}>
              Following
            </button>
            <button onClick={() => handleButtonClick("Followers")}>
              Followers
            </button>
          </ContentsMenu>
          <ContentsListWrapper>
            {activeScreen === "MySong" &&
              songList.map((value, index) => (
                <ContentsList
                  key={index}
                  isSelected={index === selectedItem}
                  onClick={() => handleItemClick(index)}
                >
                  <img src={value.src} alt="Song" />
                  <SongInfo>
                    <p>{value.title}</p>
                    <p>{value.artist}</p>
                  </SongInfo>
                  <MoreButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(index);
                    }}
                  >
                    •••
                  </MoreButton>
                  {dropdownIndex === index && (
                    <DropdownMenu ref={dropdownRef}>
                      <DropdownItem
                        onClick={() => handleOptionClick("Share", index)}
                      >
                        Share
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleOptionClick("Rename", index)}
                      >
                        Rename
                      </DropdownItem>
                      <DropdownItem
                        onClick={() =>
                          handleOptionClick("Add to Playlist", index)
                        }
                      >
                        Add to Playlist
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleOptionClick("Delete", index)}
                        delete
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  )}
                </ContentsList>
              ))}
            {activeScreen === "Playlist" && (
              <PlaylistWrapper>
                <PlaylistItem>
                  <PlaylistImage
                    src={Icon_CreatePlayList}
                    alt="Create Playlist"
                  />
                  <TitleWrapper>
                    <PlaylistTitle>Create Playlist</PlaylistTitle>
                  </TitleWrapper>
                </PlaylistItem>
                {/* Map over the playlist items */}
                {playlist.map((item, index) => (
                  <PlaylistItem key={index}>
                    <PlaylistImage src={item.src} alt={item.title} />
                    <TitleWrapper>
                      <PlaylistTitle>{item.title}</PlaylistTitle>
                      {/* <MoreButton
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                      >
                        •••
                      </MoreButton> */}
                    </TitleWrapper>
                    {dropdownIndex === index && (
                      <DropdownMenu ref={dropdownRef}>
                        <DropdownItem
                          onClick={() => handleOptionClick("Share", index)}
                        >
                          Share
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleOptionClick("Rename", index)}
                        >
                          Rename
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleOptionClick("Add to Playlist", index)
                          }
                        >
                          Add to Playlist
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleOptionClick("Delete", index)}
                          delete
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                  </PlaylistItem>
                ))}
              </PlaylistWrapper>
            )}

            {activeScreen === "Following" && <div>Following Content</div>}
            {activeScreen === "Followers" && <div>Followers Content</div>}
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

  background-image: url(${Frame});
`;

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

const ContentsList = styled.div`
  display: flex;
  align-items: center;
  width: 744px;
  height: 163px;
  background: ${(props) =>
    props.isSelected
      ? "linear-gradient(270deg, #D9D9D9 28.08%, #81D8F3 100%)"
      : "black"};
  border-style: none;
  position: relative;

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

const MoreButton = styled.button`
  background: none;
  border: none;
  color: ${Theme.colors.white};
  font-size: 24px;
  cursor: pointer;
  margin-left: auto;
  margin-right: 20px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: ${Theme.colors.black};
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  margin-top: 10px;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  ${Theme.fonts.dropdownItem}
  color: ${Theme.colors.white};
  border-radius: 10px;

  &:hover {
    background: ${Theme.colors.gray};
  }

  ${(props) =>
    props.delete &&
    `
    color: ${Theme.colors.red};
  `}
`;

const PlaylistWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  padding: 30px;
  gap: 30px;
  width: 100%;
  height: 500px;

  box-sizing: border-box;
`;

const PlaylistItem = styled.div`
  position: relative;
  width: 185px;
  height: 185px;
  text-align: center;
`;

const PlaylistImage = styled.img`
  object-fit: cover;
`;

const TitleWrapper = styled.div`
  position: absolute;
  padding-bottom: 5px;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const PlaylistTitle = styled.div`
  width: 100%;
  box-sizing: border-box;
  text-align: center;

  ${Theme.fonts.playlistTitle}
  color: ${Theme.colors.white};
`;
