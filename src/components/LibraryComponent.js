import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import AddSongModal from './modals/AddSong';

import Album1 from '../img/Album1.svg';
import Icon_CreatePlayList from '../img/playlist_new.svg';
import Icon_MyPlayList from '../img/playlist.svg';
import PlayBtn from '../img/PlayBtn.svg';
import DeleteBtn from '../img/DeleteBtn.svg';

const LibraryComponent = ({
  songlist,
  playlist,
  followerlist,
  updateSelectedLyrics,
  updateSonglist,
  updatePlaylist,
  updateFollowlist,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeScreen, setActiveScreen] = useState('MySong');
  const [dropdownIndex, setDropdownIndex] = useState(null);
  // const [selectedLyrics, setSelectedLyrics] = useState(null); // useless?
  const [SelectedPlaylist, SetSelectedPlaylist] = useState(null);
  const [playlistTrack, setPlaylistTrack] = useState(null); // 실제 받아올 playlist
  const [isModalOpen, setIsModalOpen] = useState(false);

  // test
  const [username, setUserName] = useState('박스 깎는 노인');

  const dropdownRef = useRef(null);

  const handleSongClick = (index) => {
    setSelectedItem(index);
    // setSelectedLyrics(songlist[index].lyrics);
    updateSelectedLyrics(songlist[index].lyrics);
  };

  const handleMenuClick = (screen) => {
    setActiveScreen(screen);
    setSelectedItem(null);
    // setSelectedLyrics(null);
    updateSelectedLyrics(null);
    SetSelectedPlaylist(null);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleOptionClick = (option, index) => {
    setDropdownIndex(null);
    // Add functionality for each option here
    if (option === 'Delete') {
      handleDeleteSong(index);
    }
  };

  const handleDeleteSong = (index) => {};

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIndex(null);
    }
  };

  // playlist에 노래 추가 관련 로직
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddSongToPlaylist = (songIndex) => {
    // Logic to add song to playlist
    closeModal();
  };

  const handleFollowClick = (index) => {
    // Logic to follow/unfollow user
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ContentsWrapper>
      <ContentsTitle>Library</ContentsTitle>
      {/* Library 메뉴 선택 */}
      <ContentsMenu>
        <button onClick={() => handleMenuClick('MySong')}>My Song</button>
        <button onClick={() => handleMenuClick('Playlist')}>PlayList</button>
        <button onClick={() => handleMenuClick('Following')}>Following</button>
        <button onClick={() => handleMenuClick('Followers')}>Followers</button>
      </ContentsMenu>
      <MySongWrapper>
        {activeScreen === 'MySong' &&
          songlist.map((item, index) => (
            <MySongList
              key={index}
              isSelected={index === selectedItem}
              onClick={() => handleSongClick(index)}
            >
              <img src={item.thumbnail} alt='Song' />
              <MySongInfo>
                <p>{item.title}</p>
                <p>{item.artist}</p>
              </MySongInfo>
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
                    onClick={() => handleOptionClick('Share', index)}
                  >
                    Share
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleOptionClick('Rename', index)}
                  >
                    Rename
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleOptionClick('Add to Playlist', index)}
                  >
                    Add to Playlist
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleOptionClick('Delete', index)}
                    delete
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              )}
            </MySongList>
          ))}
        {activeScreen === 'Playlist' && (
          <>
            {/* playlist 선택 
                앨범 id는 0부터 정렬*/}
            {SelectedPlaylist === null ? (
              <PlaylistWrapper>
                {/* create playlist */}
                <PlaylistItem
                  as='button'
                  onClick={() => {
                    SetSelectedPlaylist(-1);
                    console.log(-1);
                  }}
                >
                  <PlaylistImage
                    src={Icon_CreatePlayList}
                    alt='Create Playlist'
                  />
                  <PlaylistTitleWrapper>
                    <PlaylistTitle>Create Playlist</PlaylistTitle>
                  </PlaylistTitleWrapper>
                </PlaylistItem>

                {/* display playlist */}
                {playlist.map((item, index) => (
                  <PlaylistItem
                    as='button'
                    key={index}
                    onClick={() => {
                      SetSelectedPlaylist(index);
                      console.log(index);
                    }}
                  >
                    <PlaylistImage src={item.thumbnail} alt={item.title} />
                    <PlaylistTitleWrapper>
                      <PlaylistTitle>{item.title}</PlaylistTitle>
                      {/* <MoreButton
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                      >
                        •••
                      </MoreButton> */}
                    </PlaylistTitleWrapper>
                    {/* {dropdownIndex === index && (
                      <DropdownMenu ref={dropdownRef}>
                        <DropdownItem
                          onClick={() => handleOptionClick('Share', index)}
                        >
                          Share
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleOptionClick('Rename', index)}
                        >
                          Rename
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleOptionClick('Add to Playlist', index)
                          }
                        >
                          Add to Playlist
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleOptionClick('Delete', index)}
                          delete
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    )} */}
                  </PlaylistItem>
                ))}
              </PlaylistWrapper>
            ) : // create playlist
            SelectedPlaylist === -1 ? (
              <></>
            ) : // show playlist (playlist1, playlist2 ... )
            SelectedPlaylist >= 0 ? (
              <>
                <PlaylistInfoWrapper>
                  <PlaylistInfo>
                    <img
                      src={playlist[SelectedPlaylist].thumbnail}
                      alt='Song'
                    />
                    <PlaylistSongInfo>
                      <p>{playlist[SelectedPlaylist].title}</p>
                      <p>{username}</p>
                    </PlaylistSongInfo>
                    <PlaylistPlayBtn>
                      <img src={PlayBtn} alt='' />
                    </PlaylistPlayBtn>

                    {/* MoreButton Here */}

                    <MoreButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(SelectedPlaylist);
                      }}
                    >
                      •••
                    </MoreButton>
                    {dropdownIndex === SelectedPlaylist && (
                      <DropdownMenu ref={dropdownRef}>
                        <DropdownItem
                          onClick={() =>
                            handleOptionClick('Share', SelectedPlaylist)
                          }
                        >
                          Share
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleOptionClick('Rename', SelectedPlaylist)
                          }
                        >
                          Rename
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleOptionClick('Delete', SelectedPlaylist)
                          }
                          delete
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                  </PlaylistInfo>
                  <hr />
                  {/* test (playlistTrack -> songlist) */}
                  {playlistTrack ? (
                    <>
                      {songlist.map((item, index) => (
                        <MySongList
                          key={index}
                          // isSelected={index === selectedItem} // add if lyric is needed
                          // onClick={() => handleSongClick(index)}
                        >
                          <img src={item.thumbnail} alt='Song' />
                          <MySongInfo>
                            <p>{item.title}</p>
                            <p>{item.artist}</p>
                          </MySongInfo>
                          <DeleteButton onClick={() => handleDeleteSong(index)}>
                            <img src={DeleteBtn} alt='' />
                          </DeleteButton>
                        </MySongList>
                      ))}
                    </>
                  ) : (
                    <PlaylistTrackWrapper>
                      <PlaylistNoTrack>
                        There are no songs in your playlist.
                        <br />
                        Add them!
                      </PlaylistNoTrack>
                      <PlaylistAddBtn onClick={openModal}>add</PlaylistAddBtn>
                    </PlaylistTrackWrapper>
                  )}
                </PlaylistInfoWrapper>
              </>
            ) : null}
          </>
        )}
        {activeScreen === 'Following' && (
          <>
            {followerlist[0].result.followingList && (
              <>
                {followerlist[0].result.followingList.map((item, index) => (
                  <FollowList key={index}>
                    <img src={item.profile} alt='Song' />
                    <FollowInfo>
                      {/* 한글은 이 폰트로 이쁘게 안나옴; */}
                      <p>{item.name}</p>
                      <p>코딩 좋아</p>
                    </FollowInfo>
                    <FollowBtn
                      onClick={() => {
                        handleDeleteSong(index);
                        console.log('unfollow');
                      }}
                    >
                      following
                    </FollowBtn>
                  </FollowList>
                ))}
              </>
            )}
          </>
        )}
        {activeScreen === 'Followers' && (
          <>
            {followerlist[0].result.followerList && (
              <>
                {followerlist[0].result.followerList.map((item, index) => (
                  <MySongList key={index}>
                    <img src={item.profile} alt='Song' />
                    <MySongInfo>
                      <p>{item.name}</p>
                      <p>코딩 만세</p>
                    </MySongInfo>
                  </MySongList>
                ))}
              </>
            )}
          </>
        )}
      </MySongWrapper>
      {isModalOpen && (
        <AddSongModal
          songlist={songlist}
          onClose={closeModal}
          onAddSong={handleAddSongToPlaylist}
        />
      )}
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

const MySongWrapper = styled.div`
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

const MySongList = styled.div`
  display: flex;
  align-items: center;
  width: 744px;
  height: 163px;
  background: ${(props) =>
    props.isSelected
      ? 'linear-gradient(270deg, #D9D9D9 28.08%, #81D8F3 100%)'
      : 'black'};
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

const MySongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 38px;

  p {
    text-align: left;

    &:nth-child(1) {
      /* margin-top: 15px; */
      margin-bottom: 15px;
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
  position: relative;
  top: -50px;
  /* transform: translateY(-250%); */
  background: none;
  border: none;
  color: ${Theme.colors.white};
  font-size: 32px;
  cursor: pointer;
  margin-left: auto;
  margin-right: 50px;
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

const PlaylistTitleWrapper = styled.div`
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

const PlaylistInfoWrapper = styled.div`
  height: 490px;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }

  hr {
    margin-top: 44px;
    width: 80%;
  }
`;

const PlaylistInfo = styled.div`
  display: flex;
  align-items: center;
  width: 744px;
  height: 163px;
  background: ${(props) =>
    props.isSelected
      ? 'linear-gradient(270deg, #D9D9D9 28.08%, #81D8F3 100%)'
      : 'black'};
  border-style: none;
  position: relative;

  img {
    margin-left: 42px;
    width: 185px;
    height: 185px;
    object-fit: fill;
    align-self: center;
  }
`;

const PlaylistSongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 38px;
  gap: 20px;

  p {
    justify-content: left;
    text-align: left;

    &:nth-child(1) {
      margin-top: 110px;
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

const PlaylistPlayBtn = styled.button`
  background: none;
  border: none;
  color: ${Theme.colors.white};
  cursor: pointer;
  position: absolute;
  width: 80px;
  right: 150px;
  top: 30%;
  /* transform: translateY(-50%); */

  img {
    margin-left: 0;
    width: 80px;
    height: 80px;
  }
`;

const PlaylistTrackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const PlaylistNoTrack = styled.div`
  margin-top: 37px;
  font-family: 'FTLAB-HOON';
  font-weight: 500;
  font-size: 40px;
  text-align: center;
  color: ${Theme.colors.white};
`;

const PlaylistAddBtn = styled.button`
  margin-top: 20px;
  width: 198px;
  height: 42px;
  /* border: none; */
  border-radius: 21px;
  background: ${Theme.colors.lightGray};
  color: ${Theme.colors.white};
  ${Theme.fonts.list};
  text-align: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 90px;
  top: 30%;
  transform: translateY(-50%);

  img {
    width: 35px;
    height: 35px;
  }
`;

const FollowList = styled(MySongList)`
  img {
    border-radius: 50%;
  }
`;

const FollowInfo = styled(MySongInfo)`
  p {
    text-align: left;

    &:nth-child(1) {
      margin-bottom: 15px;
      //${Theme.fonts.list}
      ${Theme.fonts.songTitle};
      color: ${Theme.colors.white};
    }

    &:nth-child(2) {
      ${Theme.fonts.songArtist}
      color: ${Theme.colors.gray};
    }
  }
`;

const FollowBtn = styled.button`
  border: none;
  cursor: pointer;
  width: 139px;
  height: 45px;
  background: ${Theme.colors.lightBlue};
  border-radius: 20px;
  position: absolute;
  right: 90px;

  ${Theme.fonts.list}
  color: ${Theme.colors.white};
`;
