import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../styles/Theme';
import AddSongModal from './modals/AddSong';
import RenameMySongModal from './modals/RenameMySong';
import RenameMySong from '../api/music/RenameMySong';
import AddSongToPlaylist from '../api/music/AddSongToPlaylist';
import DeleteMySong from '../api/music/DeleteMySong';
import CreatePlaylist from '../api/music/CreatePlaylist';
import GetPlaylistByID from '../api/music/GetPlaylistByID';
import RenamePlaylistModal from './modals/RenamePlaylist';
import RenamePlaylist from '../api/music/RenamePlaylist';
import DeleteSongInPlaylist from '../api/music/DeleteSongInPlaylist';
import DeletePlaylistByID from '../api/music/DeletePlaylistByID';
import Follow from '../api/social/Follow';
import Unfollow from '../api/social/Unfollow';

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
  updateFollowingNum,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [activeScreen, setActiveScreen] = useState('MySong');
  const [dropdownIndex, setDropdownIndex] = useState(null);
  // const [selectedLyrics, setSelectedLyrics] = useState(null); // useless?
  const [SelectedPlaylist, SetSelectedPlaylist] = useState(null); // 화면 상의 playlist index(순서)
  const [playlistTrack, setPlaylistTrack] = useState(null); // 실제 받아올 playlist
  const [currentSong, setCurrentSong] = useState('');
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  const [isRenameMySongModalOpen, setIsRenameMySongModalOpen] = useState(false);
  const [isRenamePlaylistModalOpen, setIsRenamePlaylistModalOpen] =
    useState(false);
  const [isAddSongModalForSong, setIsAddSongModalForSong] = useState(true);
  const [hoverPlaylistIndex, setHoverPlaylistIndex] = useState(null);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleSongClick = (index) => {
    setSelectedItem(index);
    // console.log('songlist[index].id: ' + songlist[index].id);
    setSelectedSongId(songlist[index].id);
    // console.log('selectedSongId: ' + selectedSongId);
    // setSelectedLyrics(songlist[index].lyrics);
    // 차후 api 수정에 따라 변경 가능
    updateSelectedLyrics(songlist[index].lyrics[0].content);
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

  const handleMySongOptionClick = (option, index) => {
    setDropdownIndex(null);
    if (option === 'Share') {
      copyToClipboard(currentSong.media);
    }
    if (option === 'Rename') {
      openRenameMySongModal();
    }
    if (option === 'Add to Playlist') {
      setIsAddSongModalForSong(true);
      console.log('Set IsAddSongModalForSong true');
      openAddSongModal(songlist[index].id);
    }
    if (option === 'Delete') {
      handleDeleteSong(currentSong);
    }
  };

  const handlePlaylistOptionClick = (option, index) => {
    setDropdownIndex(null);
    if (option === 'Rename') {
      openRenamePlaylistModal();
    }
    if (option === 'Delete') {
      // handleDeletePlaylist(24);
      // DeletePlaylistByID(24);
      console.log(playlist[index].playlist_id); // 검증 필요, 이걸로 delete api 호출
      DeletePlaylistByID(playlist[index].playlist_id).then((response) => {
        if (response) {
          handleMenuClick('Playlist');
          updatePlaylist();
        }
      });
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIndex(null);
    }
  };

  // 클립보드에 곡 주소 복사
  const copyToClipboard = async (addr) => {
    const link = addr;
    try {
      await navigator.clipboard.writeText(link);
      console.log('copy success');
    } catch (error) {
      console.log('copy failed');
    }
  };

  // MySong 관련
  // MySong 이름 변경
  const openRenameMySongModal = () => {
    setIsRenameMySongModalOpen(true);
  };
  const closeRenameMySongModal = () => {
    setIsRenameMySongModalOpen(false);
  };
  const handleRenameMySong = (songData, newName) => {
    let newSongData = {
      id: songData.id,
      title: newName,
      public: songData.public, // true or false
    };

    RenameMySong(newSongData, newName).then(updateSonglist());
  };

  // MySong 삭제
  const handleDeleteSong = (currentSong) => {
    DeleteMySong(currentSong).then(updateSonglist());
  };

  // playlist 관련
  // playlist에 노래 추가 관련
  const openAddSongModal = (srcID) => {
    setSelectedSongId(srcID);
    setIsAddSongModalOpen(true);
  };
  const closeAddSongModal = () => {
    setIsAddSongModalOpen(false);
  };
  const handleAddSongToPlaylist = (playlistID, songID) => {
    console.log('songID: ' + songID + '  playlistID: ' + playlistID);
    AddSongToPlaylist(playlistID, songID).then((response) => {
      if (response.isSuccess) {
        // console.log('끼얏호');
        updatePlaylistTrack(playlistID);
      }
    });
  };

  // playlistTrack 관련
  // playlistTrack 업데이트
  const updatePlaylistTrack = (playlistID) => {
    GetPlaylistByID(playlistID).then((response) => {
      if (response.isSuccess) {
        console.log('playlistTrack Updated');
        console.log(response.result);
        setPlaylistTrack(response.result);
        if (playlistTrack) {
          console.log(playlistTrack.playlist_id);
        }
      }
    });
  };

  // playlistTrack 이름 변경
  const openRenamePlaylistModal = () => {
    setIsRenamePlaylistModalOpen(true);
  };
  const closeRenamePlaylistModal = () => {
    setIsRenamePlaylistModalOpen(false);
  };
  const handleRenamePlaylist = (playlistID, newName) => {
    RenamePlaylist(playlistID, newName).then(() => {
      GetPlaylistByID(playlistID).then((response) => {
        if (response.isSuccess) {
          // console.log(response.result);
          setPlaylistTrack(response.result);
          updatePlaylist();
        }
      });
    });
  };

  // 플레이리스트 삭제
  const handleDeleteSongInPlaylist = (playlistID, songID) => {
    DeleteSongInPlaylist(playlistID, songID).then((response) => {
      GetPlaylistByID(playlistID).then((response) => {
        if (response.isSuccess) {
          handleMenuClick('Playlist');
          updatePlaylist();
        }
      });
    });
  };

  // 메인화면에서 플레이리스트 재생
  const handlePlayClick = (songId, playlistId) => {
    const songIds = playlistTrack.songs.map((song) => song.song_id); // Track list
    // setTrack(songIds); // 전체 트랙 리스트를 설정
    // setMusicNumber(songId); // 선택된 곡의 songId를 설정

    console.log(songId, playlistId);
    // 이동과 함께 상태 전달
    navigate('/', {
      state: { track: songIds, musicNumber: songId, playlistId: playlistId },
    });
  };

  // follow / unfollow 관련
  // Initialize the state for all followingList items
  const [followStates, setFollowStates] = useState(
    followerlist.followingList.map((item) => item.unfollowed)
  );

  // Initialize a state array to track the disabled state for each button
  const [disabledButtons, setDisabledButtons] = useState(
    followerlist.followingList.map(() => false)
  );

  // 팔로우 상태 토글
  const handleFollowToggle = async (index, followingId) => {
    if (disabledButtons[index]) return; // If the button is disabled, do nothing

    // 1초 이내 추가 클릭 금지
    const newDisabledButtons = [...disabledButtons];
    newDisabledButtons[index] = true;
    setDisabledButtons(newDisabledButtons);

    setTimeout(() => {
      newDisabledButtons[index] = false;
      setDisabledButtons([...newDisabledButtons]);
    }, 1000);

    // state 따라 Follow or Unfollow
    if (followStates[index]) {
      const response = await Follow(followingId);
      if (response.success) {
        console.log(response.message);
        updateFollowingNum(1);
      } else {
        console.error(response.message);
      }
    } else {
      const response = await Unfollow(followingId);
      if (response.success) {
        console.log(response.message);
        updateFollowingNum(-1);
      } else {
        console.error(response.message);
      }
    }

    // Toggle the follow state for the clicked button
    const newFollowStates = [...followStates];
    newFollowStates[index] = !newFollowStates[index];
    setFollowStates(newFollowStates);
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
        <button
          onClick={() => {
            handleMenuClick('MySong');
            updateSonglist();
          }}
        >
          My Song
        </button>
        <button
          onClick={() => {
            handleMenuClick('Playlist');
            updatePlaylist();
          }}
        >
          PlayList
        </button>
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
                  handleSongClick(index);
                  setCurrentSong(songlist[index]);
                  e.stopPropagation();
                  toggleDropdown(index);
                }}
              >
                •••
              </MoreButton>
              {dropdownIndex === index && (
                <DropdownMenu ref={dropdownRef}>
                  <DropdownItem
                    onClick={() => {
                      handleMySongOptionClick('Share', index);
                    }}
                  >
                    Share
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      handleMySongOptionClick('Rename', index);
                    }}
                  >
                    Rename
                  </DropdownItem>

                  <DropdownItem
                    onClick={() =>
                      handleMySongOptionClick('Add to Playlist', index)
                    }
                  >
                    Add to Playlist
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleMySongOptionClick('Delete', index)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              )}
              {isRenameMySongModalOpen && (
                <RenameMySongModal
                  onClose={closeRenameMySongModal}
                  onRename={handleRenameMySong}
                  songData={currentSong}
                />
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
                    // SetSelectedPlaylist(-1); 이거 필요없이 그냥 바로 생성해도 될거 같은데?
                    console.log('playlist num: -1');
                    // 추후 모달 추가해서 플리 이름 정할 수 있게 하는게 나을 듯 함
                    CreatePlaylist('예시 플레이리스트').then((response) => {
                      if (response.isSuccess) {
                        updatePlaylist();
                      }
                    });
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

                {/* display playlist (바둑판 배열) */}
                {playlist.map((item, index) => (
                  <PlaylistItem
                    as='button'
                    key={index}
                    onClick={() => {
                      // console.log(item.playlist_id);
                      SetSelectedPlaylist(index);
                      // console.log('playlist num: ' + index);
                      updatePlaylistTrack(item.playlist_id);
                    }}
                    onMouseEnter={() => setHoverPlaylistIndex(index)}
                    onMouseLeave={() => setHoverPlaylistIndex(null)}
                  >
                    {/* 실제 들어있는 데이터 값 때문에 조건은 아래처럼 */}
                    {item.first_song_thumbnail &&
                    item.first_song_thumbnail !== null ? (
                      <PlaylistImage
                        src={item.first_song_thumbnail}
                        alt={item.playlist_title}
                      />
                    ) : (
                      <PlaylistImage
                        src={Icon_MyPlayList}
                        alt={item.playlist_title}
                      />
                    )}
                    <PlaylistTitleWrapper>
                      <PlaylistTitle>{item.playlist_title}</PlaylistTitle>
                    </PlaylistTitleWrapper>
                    {hoverPlaylistIndex === index && (
                      <MoreButton
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                      >
                        •••
                      </MoreButton>
                    )}
                  </PlaylistItem>
                ))}
                {dropdownIndex !== null && (
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
                )}
              </PlaylistWrapper>
            ) : // create playlist
            // 이 부분 필요 없을 듯
            SelectedPlaylist === -1 ? (
              <></>
            ) : // 선택한 플레이리스트 보여주기 (playlist1, playlist2 ... )
            SelectedPlaylist >= 0 ? (
              <>
                {playlistTrack !== null ? (
                  <PlaylistInfoWrapper>
                    <PlaylistInfo>
                      {playlistTrack.thumbnail !== null ? (
                        <img src={playlistTrack.thumbnail} alt='Song' />
                      ) : (
                        <img src={Icon_MyPlayList} alt='Song' />
                      )}
                      <PlaylistSongInfo>
                        <p>{playlistTrack.playlist_title}</p>
                        {/* <p>{playlist[SelectedPlaylist].artist}</p> */}
                      </PlaylistSongInfo>
                      {playlistTrack.songs && (
                        <PlaylistPlayBtn>
                          <img
                            src={PlayBtn}
                            alt=''
                            onClick={() =>
                              handlePlayClick(
                                playlistTrack.songs[0].song_id,
                                playlistTrack.playlist_id
                              )
                            }
                          />
                        </PlaylistPlayBtn>
                      )}

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
                          {/* <DropdownItem
                            onClick={() =>
                              handlePlaylistOptionClick(
                                'Share',
                                SelectedPlaylist
                              )
                            }
                          >
                            Share
                          </DropdownItem> */}
                          <DropdownItem
                            onClick={() =>
                              handlePlaylistOptionClick(
                                'Rename',
                                SelectedPlaylist
                              )
                            }
                          >
                            Rename
                          </DropdownItem>
                          <DropdownItem
                            onClick={() =>
                              handlePlaylistOptionClick(
                                'Delete',
                                SelectedPlaylist
                              )
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
                    {playlistTrack.songs ? (
                      <>
                        {playlistTrack.songs.map((item, index) => (
                          <MySongList
                            key={index}
                            // isSelected={index === selectedItem} // add if lyric is needed
                            // onClick={() => handleSongClick(index)}
                          >
                            <img src={item.thumbnail} alt='Song' />
                            <MySongInfo>
                              <p>{item.song_title}</p>
                              <p>{item.artist_name}</p>
                            </MySongInfo>
                            <DeleteButton
                              onClick={() => {
                                handleDeleteSongInPlaylist(
                                  playlistTrack.playlist_id,
                                  item.song_id
                                );
                              }}
                            >
                              <img src={DeleteBtn} alt='' />
                            </DeleteButton>
                          </MySongList>
                        ))}
                        <PlaylistTrackWrapper>
                          <PlaylistNoTrack>
                            Add more songs on your playlist!
                          </PlaylistNoTrack>
                          <PlaylistAddBtn
                            onClick={() => {
                              setIsAddSongModalForSong(false);
                              console.log('Set IsAddSongModalForSong false');
                              openAddSongModal(); //
                            }}
                          >
                            add
                          </PlaylistAddBtn>
                        </PlaylistTrackWrapper>
                      </>
                    ) : (
                      <PlaylistTrackWrapper>
                        <PlaylistNoTrack>
                          There are no songs in your playlist.
                          <br />
                          Add them!
                        </PlaylistNoTrack>
                        <PlaylistAddBtn
                          onClick={() => {
                            setIsAddSongModalForSong(false);
                            console.log('Set IsAddSongModalForSong false');
                            openAddSongModal(); //
                          }}
                        >
                          add
                        </PlaylistAddBtn>
                      </PlaylistTrackWrapper>
                    )}
                    {isRenamePlaylistModalOpen && (
                      <RenamePlaylistModal
                        onClose={closeRenamePlaylistModal}
                        onRename={handleRenamePlaylist}
                        playlistID={playlistTrack.playlist_id}
                      />
                    )}
                  </PlaylistInfoWrapper>
                ) : (
                  <></>
                )}
              </>
            ) : null}
          </>
        )}
        {activeScreen === 'Following' && (
          <>
            {followerlist.followingList && (
              <>
                {followerlist.followingList.map((item, index) => (
                  <FollowList key={index}>
                    <img src={item.profile} alt='Profile' />
                    <FollowInfo>
                      <p>{item.name}</p>
                      <p>{item.introduce}</p>
                    </FollowInfo>
                    <FollowBtn
                      unfollowed={followStates[index]} // Use state value from array
                      onClick={() =>
                        handleFollowToggle(index, item.following_id)
                      } // Pass the index and followingId to update the correct item
                      disabled={disabledButtons[index]} // Disable the button individually
                    >
                      {followStates[index] ? 'Follow' : 'Following'}
                    </FollowBtn>
                  </FollowList>
                ))}
              </>
            )}
          </>
        )}
        {activeScreen === 'Followers' && (
          <>
            {followerlist.followerList && (
              <>
                {followerlist.followerList.map((item, index) => (
                  <FollowList key={index}>
                    <img src={item.profile} alt='Song' />
                    <FollowInfo>
                      <p>{item.name}</p>
                      <p>{item.introduce}</p>
                    </FollowInfo>
                  </FollowList>
                ))}
              </>
            )}
          </>
        )}
      </MySongWrapper>
      {isAddSongModalOpen && (
        <AddSongModal
          datalist={isAddSongModalForSong ? playlist : songlist}
          onClose={closeAddSongModal}
          onAddSong={handleAddSongToPlaylist}
          isForSong={isAddSongModalForSong}
          srcID={
            isAddSongModalForSong ? selectedSongId : playlistTrack.playlist_id
          }
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
  /* gap: 30px; */
  row-gap: 30px;
  /* column-gap: 10px; */
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
  border-radius: none;
`;

const PlaylistImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* border-radius: inherit; */
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
  margin: 20px 0;
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
  background-color: ${({ unfollowed }) => (unfollowed ? 'gray' : 'lightblue')};
  border-radius: 20px;
  position: absolute;
  right: 90px;

  ${Theme.fonts.list}
  color: ${Theme.colors.white};
`;
