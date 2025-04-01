import React, { useState, useEffect, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../styles/Theme';
import { Axios } from '../api/Axios';
import GlobalStyle from '../styles/GlobalStyle';
import Cookies from 'js-cookie';

import background from '../img/background.png';

import SideMenu from '../components/SideMenu';
import Credit from '../components/Credit';
import Profile from '../components/Profile';

import AddSongModal from '../components/modals/AddSong';
import GetAllPlaylist from '../api/music/GetAllPlaylist.js';
import AddSongToPlaylist from '../api/music/AddSongToPlaylist';
import GetFollowList from '../api/social/GetFollowList.js';
import Follow from '../api/social/Follow';
import Unfollow from '../api/social/Unfollow';
import PostLike from '../api/music/PostLike.js';
import DeleteLike from '../api/music/DeleteLike.js';
import CheckLike from '../api/music/CheckLike.js';

const token = Cookies.get('token');

function Social() {
  const [topSongs, setTopSongs] = useState([]);
  const [todaySongs, setTodaySongs] = useState([]);
  const [popularUsers, setPopularUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState([]);
  const [musicNumber, setMusicNumber] = useState(null);
  const [search, setSearch] = useState(''); // 검색 상태 추가
  const [searchResult, setSearchResult] = useState([]); // 검색 결과 상태
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [randomMusic, setRandomMusic] = useState([]);
  const [searchMusic, setSearchMusic] = useState(false);

  const [playlist, setPlaylist] = useState([]);
  // const [currentSong, setCurrentSong] = useState('');
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  const [followStates, setFollowStates] = useState({}); // { [userId]: true/false }
  const [disabledButtons, setDisabledButtons] = useState({}); // { [userId]: true/false }
  const [hoverUserId, setHoverUserId] = useState(null);
  const [likedMap, setLikedMap] = useState({});

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const fetchRankData = async () => {
    try {
      const topResponse = await Axios.get('/social/rank/top'); // 탑 랭크 호출
      const todayResponse = await Axios.get('/social/rank/today'); // 투데이 랭크 호출

      setTopSongs(topResponse.data.result.topsongs); // 탑 랭크 데이터 저장
      setTodaySongs(todayResponse.data.result.todaysongs); // 투데이 랭크 데이터 저장
      setLoading(false); // 로딩 상태 업데이트
      // console.log(topResponse);
      console.log('topSongs:', topSongs);
    } catch (err) {
      console.error('Error fetching rank data:', err);
    }
  };

  useEffect(() => {
    fetchRankData(); // 컴포넌트가 마운트될 때 데이터 호출
  }, []);

  const handleRandomMusicClick = (songId) => {
    const songIds = topSongs.map((song) => song.songId);
    setTrack(songIds);
    setMusicNumber(songId);
    navigate('/', { state: { track: songIds, musicNumber: songId } });
  };

  const handleSearchMusicClick = (songId) => {
    const songIds = topSongs.map((song) => song.songId);
    setTrack(songIds);
    setMusicNumber(songId);
    navigate('/', { state: { track: songIds, musicNumber: songId } });
  };

  const handleTopRankClick = (songId) => {
    const songIds = topSongs.map((song) => song.songId); // Track list
    setTrack(songIds); // 전체 트랙 리스트를 설정
    setMusicNumber(songId); // 선택된 곡의 songId를 설정

    // 이동과 함께 상태 전달
    navigate('/', { state: { track: songIds, musicNumber: songId } });
  };

  const handleTodayClick = (songId) => {
    const songIds = todaySongs.map((song) => song.songId);
    setTrack(songIds); // 전체 트랙 리스트를 설정
    setMusicNumber(songId); // 선택된 곡의 songId를 Home.js에 전달
    // setisPlay(true);
    console.log(track);
    console.log(musicNumber);
    navigate('/', { state: { track: songIds, musicNumber: songId } });
  };

  const fetchRandomData = async () => {
    try {
      const response = await Axios.get('/music/random'); // 인기 유저 랭크 API 호출
      setRandomMusic(response.data.result); // 응답 데이터의 결과 저장
      setLoading(false); // 로딩 상태 업데이트
    } catch (err) {
      console.error('Error fetching popular users:', err);
    }
  };

  useEffect(() => {
    fetchRandomData(); // 컴포넌트가 마운트될 때 데이터 호출
  }, []);

  // 검색 기능 구현
  const handleSearch = async (e) => {
    const keyword = e.target.value.trim();
    setSearch(e.target.value);
    if (e.target.value === '') {
      setSearchResult(null); // 검색어가 없으면 결과를 초기화
      setSearchMusic(false);
      return;
    }
    setSearchMusic(true);

    try {
      // 검색 API 호출
      const response = await Axios.get('/social/search', {
        params: {
          keyword: search, // Search keyword
        },
      });
      console.log(response);

      // 검색 결과를 받아와 처리
      const searchResults = response.data.result.songs; // 검색 결과는 API의 'result'를 통해 받음

      if (searchResults.length > 0) {
        setSearchResult(searchResults); // 검색 결과가 있으면 상태에 저장
      } else {
        setSearchResult(null); // 검색 결과가 없으면 초기화
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
      setSearchResult(null); // 에러 발생 시 결과 초기화
    }
  };

  // 좋아요(favorite) 관련
  const handleFavoriteClick = async (songId) => {
    const isLiked = likedMap[songId];

    if (isLiked) {
      await PostLike(songId, token);
    } else {
      await DeleteLike(songId, token);
    }

    setLikedMap((prev) => ({
      ...prev,
      [songId]: !isLiked,
    }));
  };

  const checkLikedStatus = async (songId) => {
    const likedRes = await CheckLike(songId, token);
    console.log('likedRes:', likedRes);
    return likedRes; // false면 이미 좋아요 누른 상태태
  };

  useEffect(() => {
    const fetchLikedStatus = async () => {
      const newMap = {};

      await Promise.all(
        topSongs.map(async (song) => {
          const isLiked = await checkLikedStatus(song.songId, token);
          newMap[song.songId] = isLiked;
        })
      );
      // console.log('newMap:', newMap);
      setLikedMap(newMap);
      // console.log('likedMap:', likedMap);
    };

    if (topSongs.length > 0) {
      fetchLikedStatus();
      // console.log('topsongs:', topSongs);
    }
  }, [topSongs]);

  // follow / unfollow 관련
  const initFollowStates = (popularUsers, followList) => {
    const followedIdSet = new Set(followList.map((user) => user.following_id));
    const newFollowStates = {};

    popularUsers.forEach((user) => {
      newFollowStates[user.userId] = followedIdSet.has(user.userId);
    });

    console.log('최종 생성된 follow state:', newFollowStates);
    setFollowStates(newFollowStates);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularRes, followListRes] = await Promise.all([
          Axios.get('/social/popular'), // 인기 유저 목록
          GetFollowList(token), // 내가 팔로우한 유저 목록
        ]);

        // console.log('popularRes:', popularRes.data.result);
        // console.log('followListRes:', followListRes.result.followingList);

        setPopularUsers(popularRes.data.result);
        const followList = followListRes.result.followingList;

        // followStates 초기화
        initFollowStates(popularRes.data.result, followList);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  const handleFollowToggle = async (userId) => {
    if (disabledButtons[userId]) return;

    // 버튼 비활성화 1초
    setDisabledButtons((prev) => ({
      ...prev,
      [userId]: true,
    }));

    setTimeout(() => {
      setDisabledButtons((prev) => ({
        ...prev,
        [userId]: false,
      }));
    }, 1000);

    // 현재 follow 상태 확인 후 API 호출
    if (followStates[userId]) {
      const response = await Unfollow(userId, token);
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    } else {
      const response = await Follow(userId, token);
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    }

    // 상태 토글
    setFollowStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // 플레이리스트에 곡 추가하기
  const openAddSongModal = (srcID) => {
    setSelectedSongId(srcID); // 여기서도 필요한가? - ㅇㅇ addSongModal에 들어감
    setIsAddSongModalOpen(true);
  };
  const closeAddSongModal = () => {
    setIsAddSongModalOpen(false);
  };
  const handleAddSongToPlaylist = (playlistID, songID) => {
    console.log('songID: ' + songID + '  playlistID: ' + playlistID);
    AddSongToPlaylist(playlistID, songID, token).then((response) => {
      if (response.isSuccess) {
        // console.log('끼얏호');
        // updatePlaylistTrack(playlistID);
      }
    });
  };

  //여기부터 드롭다운
  const handleSongClick = (index) => {
    // console.log('songlist[index].id: ' + songlist[index].id);
    setSelectedSongId(topSongs[index].songId);
  };

  const handleToprankOptionClick = (option, index) => {
    setDropdownIndex(null);
    if (option === 'addToPlaylist') {
      openAddSongModal(topSongs[index].songId);
    }
    if (option === 'favorite') {
      //   openRenameMySongModal();
    }
  };
  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
    console.log('현재 index:', index);
    console.log('dropdownIndex:', dropdownIndex);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    GetAllPlaylist(token).then((response) => {
      console.log(response.isSuccess);
      if (response.isSuccess) {
        // console.log(response.result);
        setPlaylist(response.result);
      }
    });
  }, []);

  // 테스트 데이터
  // useEffect(() => {
  //   PostLike(24, token);
  //   PostLike(38, token);
  //   PostLike(48, token);
  //   PostLike(56, token);
  // }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <FieldWrapper>
        <SideMenu />
        <Profile />
        <Credit />
        <MainField>
          <SearchField>
            <ContentTitle>Search</ContentTitle>
            <SearchInput
              type='text'
              value={search}
              onChange={handleSearch}
              placeholder='Please search for a user or song'
            />
            {!searchMusic && (
              <SearchResultWrapper>
                {randomMusic.map((song, index) => (
                  <ContentWrapper
                    key={index}
                    onClick={() => handleRandomMusicClick(song.songId)}
                  >
                    <RankContent>
                      <img
                        style={{
                          width: '78px',
                          height: '78px',
                          borderRadius: '20px',
                        }}
                        src={song.thumbnail}
                        alt={`Thumbl ${index + 1}`}
                      />
                      <div style={{ marginLeft: '10px' }}>
                        <Musictitle>{song.title}</Musictitle>
                        <MusicArtist>{song.userName}</MusicArtist>
                      </div>
                    </RankContent>
                  </ContentWrapper>
                ))}
              </SearchResultWrapper>
            )}
            {searchResult && (
              <SearchResultWrapper>
                {searchResult.map((song, index) => (
                  <ContentWrapper
                    key={index}
                    onClick={() => handleRandomMusicClick(song.id)}
                  >
                    <RankContent>
                      <img
                        style={{
                          width: '78px',
                          height: '78px',
                          borderRadius: '20px',
                        }}
                        src={song.thumbnail}
                        alt={`Thumbl ${index + 1}`}
                      />
                      <div style={{ marginLeft: '10px' }}>
                        <Musictitle>{song.title}</Musictitle>
                        <MusicArtist>{song.userName}</MusicArtist>
                      </div>
                    </RankContent>
                  </ContentWrapper>
                ))}
              </SearchResultWrapper>
            )}
          </SearchField>
          <TopField>
            <ContentTitle>TopRank</ContentTitle>
            <TopContent>
              {topSongs.map((song, index) => (
                <ContentWrapper
                  key={index}
                  onClick={() => handleTopRankClick(song.songId)}
                >
                  <Number>{index + 1}.</Number>

                  <RankContent>
                    <img
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '20px',
                      }}
                      src={song.thumbnail}
                      alt={`Thumb ${index + 1}`}
                    />

                    <div style={{ marginLeft: '20px' }}>
                      <Musictitle>{song.title}</Musictitle>
                      <MusicArtist>{song.userName}</MusicArtist>
                    </div>

                    <DropdownWrapper
                      onClick={(e) => {
                        e.stopPropagation(); // ContentWrapper로 전파 방지
                      }}
                    >
                      <DropdownToggle onClick={() => toggleDropdown(index)}>
                        •••
                      </DropdownToggle>

                      {dropdownIndex === index && (
                        <DropdownMenu ref={dropdownRef}>
                          <DropdownItem
                            onClick={() =>
                              handleToprankOptionClick('addToPlaylist', index)
                            }
                          >
                            Add to Playlist
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleFavoriteClick(song.songId)}
                            $favorite={likedMap[song.songId] === false}
                          >
                            Favorite
                          </DropdownItem>
                        </DropdownMenu>
                      )}
                    </DropdownWrapper>
                  </RankContent>
                </ContentWrapper>
              ))}
            </TopContent>
          </TopField>
          <TodayField>
            <ContentTitle>Today</ContentTitle>
            <TodayContent>
              {todaySongs.map((song, index) => (
                <ContentWrapper
                  key={index}
                  onClick={() => handleTodayClick(song.songId)}
                >
                  <Number>{index + 1}.</Number>
                  <RankContent>
                    <img
                      style={{
                        width: '78px',
                        height: '78px',
                        borderRadius: '20px',
                      }}
                      src={song.thumbnail}
                      alt={`Thumbl ${index + 1}`}
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <Musictitle>{song.title}</Musictitle>
                      <MusicArtist>{song.userName}</MusicArtist>
                    </div>
                    {/* <div
                      style={{
                        justifyContent: 'right',
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'white',
                      }}
                    ></div> */}
                  </RankContent>
                </ContentWrapper>
              ))}
            </TodayContent>
          </TodayField>
          <PopularField>
            <ContentTitle>Popular</ContentTitle>
            <PopularContentWrapper>
              {popularUsers.map((user) => (
                <PopularWrapper key={user.userId}>
                  <img
                    src={user.profile}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50px',
                    }}
                    alt={user.userName}
                  />
                  <PopularContent>
                    <div style={{ marginLeft: '10px' }}>
                      <UserName>{user.userName}</UserName>

                      <UserMessage
                        onMouseEnter={() => setHoverUserId(user.userId)}
                        onMouseLeave={() => setHoverUserId(null)}
                      >
                        {hoverUserId === user.userId ? (
                          <button
                            disabled={disabledButtons[user.userId]}
                            onClick={() => handleFollowToggle(user.userId)}
                            style={{
                              width: '98px',
                              height: '47px',
                              padding: '5px 15px',
                              borderRadius: '10px',
                              border: followStates[user.userId]
                                ? '1px solid white'
                                : 'none',
                              backgroundColor: followStates[user.userId]
                                ? 'transparent'
                                : Theme.colors.borderGray,
                              color: 'white',
                              cursor: 'pointer',
                            }}
                          >
                            {followStates[user.userId] ? 'Unfollow' : 'Follow'}
                          </button>
                        ) : (
                          '안녕하세요'
                        )}
                      </UserMessage>
                    </div>
                  </PopularContent>
                </PopularWrapper>
              ))}
            </PopularContentWrapper>
          </PopularField>
        </MainField>
        {isAddSongModalOpen && (
          <AddSongModal
            datalist={playlist}
            onClose={closeAddSongModal}
            onAddSong={handleAddSongToPlaylist}
            isForSong={true}
            srcID={
              // isAddSongModalForSong ? selectedSongId : playlistTrack.playlist_id
              selectedSongId
            }
            token={token}
          />
        )}
      </FieldWrapper>
    </ThemeProvider>
  );
}

export default Social;

const FieldWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: ${Theme.colors.darkGray};
`;

const MainField = styled.div`
  display: flex;
  margin-top: 47px;
  /* display: flex; */
  position: relative;
  /* overflow: visible; */
  /* display: grid; */
  z-index: 1;
  width: 1615px;
  height: 1000px;
  margin-left: 45px;

  -webkit-mask-image: url(${background});
  mask-image: url(${background});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  background: linear-gradient(180deg, #666666 0%, #000000 9%);

  img {
    background-size: none;
  }
`;

const SearchField = styled.div`
  width: 400px;
  height: 700px;
  margin-left: 40px;
`;

const SearchInput = styled.input`
  width: 90%;
  margin-left: 5%;
  padding: 8px;
  margin-top: 15px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 18px;
  background: #333;
  color: #fff;
`;

const SearchResultWrapper = styled.div`
  /* margin-top: 20px; */
  display: static;
  overflow-y: auto;
  /* margin-top: 10px; */
  width: 100%;
  height: 500px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TopField = styled.div`
  width: 450px;
  height: 980px;
`;
const TopContent = styled.div`
  display: static;
  overflow-y: auto;
  margin-top: 60px;
  width: 100%;
  height: 850px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const TodayField = styled.div`
  width: 400px;
  height: 980px;
`;

const TodayContent = styled.div`
  display: static;
  overflow-y: auto;
  margin-top: 60px;
  width: 100%;
  height: 850px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const ContentTitle = styled.div`
  ${Theme.fonts.title}
  color: ${Theme.colors.white};
  margin-top: 45px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  cursor: pointer;
  margin-top: 17px;
  width: 100%;
  height: 125px;
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid #FFFFFF; */
`;

const Number = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  ${Theme.fonts.songTitle}
  color: ${Theme.colors.white};
  font-size: 50px;
  line-height: 40px;
`;
const RankContent = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-grow: 1;
`;
const Musictitle = styled.div`
  ${Theme.fonts.songTitle}
  font-size: 30px;
  /* identical to box height */

  color: ${Theme.colors.white};
`;
const MusicArtist = styled.div`
  ${Theme.fonts.songArtist}
  color: ${Theme.colors.gray};
  margin-top: 10px;
  font-size: 20px;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const DropdownToggle = styled.div`
  width: 50px;
  height: 50px;
  color: white;
  font-size: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:hover {
    color: ${Theme.colors.gray};
  }
`;

const PopularField = styled.div`
  width: 250px;
  height: 870px;
  margin-left: 20px;
  margin-top: 70px;
`;

const PopularContentWrapper = styled.div`
  display: static;
  overflow-y: auto;
  margin-top: 60px;
  width: 100%;
  height: 760px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const PopularWrapper = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  align-items: center;
`;

const PopularContent = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const UserName = styled.div`
  width: 100%;
  ${Theme.fonts.songArtist}
  font-size: 25px;
  color: ${Theme.colors.white};
`;

const UserMessage = styled.div`
  margin-top: 10px;
  ${Theme.fonts.button}
  font-size: 20px;
  color: ${Theme.colors.lightGray};
`;

//드롭다운 css
const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: ${Theme.colors.darkGray};
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
  /* color: ${Theme.colors.white}; */
  border-radius: 10px;

  &:hover {
    background: ${Theme.colors.gray};
  }

  color: ${({ $favorite }) => ($favorite ? 'red' : 'white')};
`;
