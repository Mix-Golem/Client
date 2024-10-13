import React, {useState, useEffect, useRef} from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Theme } from '../styles/Theme'
import { Axios } from '../api/Axios'
import GlobalStyle from '../styles/GlobalStyle'

import background from '../img/background.png';

import SideMenu from '../components/SideMenu'
import Credit from '../components/Credit'
import Profile from '../components/Profile'

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

    const dropdownRef = useRef(null);

    const fetchRankData = async () => {
        try {
          const topResponse = await Axios.get('/social/rank/top'); // 탑 랭크 호출
          const todayResponse = await Axios.get('/social/rank/today'); // 투데이 랭크 호출
    
          setTopSongs(topResponse.data.result.topsongs); // 탑 랭크 데이터 저장
          setTodaySongs(todayResponse.data.result.todaysongs); // 투데이 랭크 데이터 저장
          setLoading(false); // 로딩 상태 업데이트
          console.log(topResponse);
        } catch (err) {
          console.error('Error fetching rank data:', err);
        }
      };
    
      useEffect(() => {
        fetchRankData(); // 컴포넌트가 마운트될 때 데이터 호출
      }, []);

    const handleTopRankClick = (songId) => {
        const songIds = topSongs.map(song => song.songId)
        setTrack(songIds); // 전체 트랙 리스트를 설정
        setMusicNumber(songId); // 선택된 곡의 songId를 Home.js에 전달
        // setisPlay(true);
        console.log(songId);
    }

    const handleTodayClick = (songId) => {
        const songIds = todaySongs.map(song => song.songId)
        setTrack(songIds); // 전체 트랙 리스트를 설정
        setMusicNumber(songId); // 선택된 곡의 songId를 Home.js에 전달
        // setisPlay(true);
        console.log(track);
        console.log(musicNumber);
    }

    // 검색 기능 구현
    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
        setSearchResult(null); // 검색어가 없으면 결과를 초기화
        return;
        }
    
        // TopRank와 Today에서 제목이 일부라도 일치하는 노래들 찾기
        const foundTopSongs = topSongs.filter((song) =>
        song.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        const foundTodaySongs = todaySongs.filter((song) =>
        song.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
    
        // 이름 중복 확인을 위해 두 배열을 합치기
        const combinedResults = [...foundTopSongs, ...foundTodaySongs];
    
        // 이름 중복 여부 확인
        const uniqueResults = [];
        const titles = new Set();
    
        combinedResults.forEach((song) => {
        if (!titles.has(song.title)) {
            uniqueResults.push(song); // 중복되지 않은 노래는 추가
            titles.add(song.title); // 제목 저장
        }
        });
    
        // 결과 설정
        if (uniqueResults.length > 0) {
        setSearchResult(uniqueResults); // 중복을 제외한 결과 저장
        } else {
        setSearchResult(null); // 검색 결과가 없으면 초기화
        }
    };

    // popular API 호출 함수
    const fetchPopularUsers = async () => {
        try {
        const response = await Axios.get('/social/popular'); // 인기 유저 랭크 API 호출
        setPopularUsers(response.data.result); // 응답 데이터의 결과 저장
        setLoading(false); // 로딩 상태 업데이트
        } catch (err) {
        console.error('Error fetching popular users:', err);
        }
    };

    useEffect(() => {
        fetchPopularUsers(); // 컴포넌트가 마운트될 때 데이터 호출
    }, []);

    //여기부터 드롭다운
    const handleMySongOptionClick = (option, index) => {
        setDropdownIndex(null);
        if (option === 'Add') {
        //   copyToClipboard(currentSong.media);
        }
        if (option === 'favorite') {
        //   openRenameMySongModal();
        }
    };
    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
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
    
    
    
  return (
    <ThemeProvider theme={Theme}>
        <GlobalStyle/>
        <FieldWrapper>
            <SideMenu/>
            <Profile/>
            <Credit/>
            <MainField>
                <SearchField>
                    <ContentTitle>Search</ContentTitle>
                    <SearchInput
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Please search for a user or song"
                    />
                    {searchResult && (
                        <SearchResultWrapper>
                        {searchResult.map((song, index) => (
                            <ContentWrapper key={index}>
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
                            <ContentWrapper key={index} onClick={() => handleTopRankClick(song.songId)}>
                                <Number>{index + 1}.</Number>
                                <RankContent>
                                <img
                                    style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '20px',
                                    }}
                                    src={song.thumbnail}
                                    alt={`Thumbl ${index + 1}`}
                                />
                                <div style={{ marginLeft: '20px' }}>
                                    <Musictitle>{song.title}</Musictitle>
                                    <MusicArtist>{song.userName}</MusicArtist>
                                </div>
                                <div style={{width:"50px", height:"50px", color:"white",position:"absolute", top:0, right:0, fontSize:"32px", cursor:"pointer"}}
                                    onClick={(e) => {
                                        // setCurrentSong(songlist[index]);
                                        e.stopPropagation();
                                        toggleDropdown(index);
                                    }}
                  
                                >•••</div>
                                {dropdownIndex === index && (
                                    <DropdownMenu ref={dropdownRef}>
                                    <DropdownItem
                                        onClick={
                                        () => {
                                            handleMySongOptionClick('Share', index);
                                        }
                                        }
                                    >
                                        Add to Playlist
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => {
                                        handleMySongOptionClick('Rename', index);
                                        }}
                                    >
                                        favorite
                                    </DropdownItem>
                                    </DropdownMenu>
                                )}
                                </RankContent>
                            </ContentWrapper>
                        ))}
                    </TopContent>
                </TopField>
                <TodayField>
                    <ContentTitle>Today</ContentTitle>
                    <TodayContent>
                        {todaySongs.map((song, index) => (
                            <ContentWrapper key={index} onClick={() => handleTodayClick(song.songId)}>
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
                                <div style={{ justifyContent:"right",width:"20px", height:"20px", backgroundColor:"white"}}></div>
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
                                <img src={user.profile} style={{width:"120px", height:"120px", borderRadius:"50px"}} alt={user.userName} />
                                <PopularContent>
                                    <div style={{marginLeft:"10px"}}>
                                    <UserName>{user.userName}</UserName>
                                    <UserMessage>안녕하세요</UserMessage>
                                    </div>
                                </PopularContent>
                            </PopularWrapper>
                        ))}
                    </PopularContentWrapper>
                </PopularField>
            </MainField>
        </FieldWrapper>
    </ThemeProvider>
  )
}

export default Social


const FieldWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100vw;
    height: 100vh;
    background: ${Theme.colors.darkGray};
`

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

  img{
    background-size: none;
  }
`

const SearchField = styled.div`
    width: 400px;
    height: 700px;
    margin-left: 40px;
`

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
`
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
`

const TodayField = styled.div`
    width: 400px;
    height: 980px;

`

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
`

const ContentTitle = styled.div`
    ${Theme.fonts.title}
    color: ${Theme.colors.white};
    margin-top: 45px;
    text-align: center;
    display: flex;
    justify-content: center;
`

const ContentWrapper = styled.div`
    cursor: pointer;
    margin-top: 17px;
    width: 100%;
    height: 125px;
    display: flex;
    align-items: center;
    /* border-bottom: 1px solid #FFFFFF; */
`

const Number = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    ${Theme.fonts.songTitle}
    color: ${Theme.colors.white};
    font-size: 50px;
    line-height: 40px;
`
const RankContent = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
`
const Musictitle = styled.div`
    ${Theme.fonts.songTitle}
    font-size: 30px;
    /* identical to box height */

    color: ${Theme.colors.white}
`
const MusicArtist = styled.div`
    ${Theme.fonts.songArtist}
    color: ${Theme.colors.gray};
    margin-top: 10px;
    font-size: 20px;
`

const PopularField = styled.div`
    width: 250px;
    height: 870px;
    margin-left: 20px;
    margin-top: 70px;
`

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
`

const PopularWrapper = styled.div`
    width: 100%;
    height: 125px;
    display: flex;
    align-items: center;
`

const PopularContent = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
`

const UserName = styled.div`
    width: 100%;
    ${Theme.fonts.songArtist}
    font-size: 25px;
    color: ${Theme.colors.white};
`

const UserMessage = styled.div`
    margin-top: 10px;
    ${Theme.fonts.button}
    font-size: 20px;
    color: ${Theme.colors.lightGray};
`

//드롭다운 css
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