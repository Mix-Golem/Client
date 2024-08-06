import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Theme } from "../styles/Theme";

import Album1 from "../img/Album1.svg";
import Icon_CreatePlayList from "../img/playlist_new.svg";
import Icon_MyPlayList from "../img/playlist.svg";

const LibraryComponent = ({
  songlist,
  playlist,
  updateSelectedLyrics,
  updateSonglist,
  updatePlaylist,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeScreen, setActiveScreen] = useState("MySong");
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [selectedLyrics, setSelectedLyrics] = useState(null); // useless?

  const dropdownRef = useRef(null);

  const handleSongClick = (index) => {
    setSelectedItem(index);
    setSelectedLyrics(songlist[index].lyrics);
    updateSelectedLyrics(songlist[index].lyrics);
  };

  const handleMenuClick = (screen) => {
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
  return (
    <ContentsWrapper>
      <ContentsTitle>Library</ContentsTitle>
      <ContentsMenu>
        <button onClick={() => handleMenuClick("MySong")}>My Song</button>
        <button onClick={() => handleMenuClick("Playlist")}>PlayList</button>
        <button onClick={() => handleMenuClick("Following")}>Following</button>
        <button onClick={() => handleMenuClick("Followers")}>Followers</button>
      </ContentsMenu>
      <ContentsListWrapper>
        {activeScreen === "MySong" &&
          songlist.map((item, index) => (
            <ContentsList
              key={index}
              isSelected={index === selectedItem}
              onClick={() => handleSongClick(index)}
            >
              <img src={item.thumbnail} alt="Song" />
              <SongInfo>
                <p>{item.title}</p>
                <p>{item.artist}</p>
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
                    onClick={() => handleOptionClick("Add to Playlist", index)}
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
            <PlaylistItem as="button">
              <PlaylistImage src={Icon_CreatePlayList} alt="Create Playlist" />
              <TitleWrapper>
                <PlaylistTitle>Create Playlist</PlaylistTitle>
              </TitleWrapper>
            </PlaylistItem>
            {/* Map over the playlist items */}
            {playlist.map((item, index) => (
              <PlaylistItem as="button" key={index}>
                <PlaylistImage src={item.thumbnail} alt={item.title} />
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
  );
};

export default LibraryComponent;

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
  overflow: hidden;
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
  padding: 0px;
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
