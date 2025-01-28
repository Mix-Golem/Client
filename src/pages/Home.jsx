import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { Theme } from '../styles/Theme';
import { Axios } from '../api/Axios';
import { useLocation } from 'react-router-dom';
import GlobalStyle from '../styles/GlobalStyle';
import Cookies from 'react-cookie';

import  AudioPlayer  from  'react-h5-audio-player' ;
import 'react-h5-audio-player/lib/styles.css' ; 
import { useCookies } from 'react-cookie';

import nonmain from '../img/notLoginMain.png';
import t1 from '../img/t1.jpg';
import t2 from '../img/notLoginMain.png'
import background from '../img/background.png';

import SideMenu  from '../components/SideMenu';
import Profile from '../components/Profile';
import Playlist from '../components/Playlist';
import TopRank from '../components/TopRank';
import Credit from '../components/Credit';
import Wave from '../components/Wave';


function Home() {
  const [track, setTrack] =useState([]);
  const [playlistId, setPlaylistId] = useState(-1);

  const [login, setLogin] = useState(true);
  const [isPlay, setisPlay] = useState(false);
  const [backimg, setBackimg] = useState(t1);
  const [animating, setAnimating] = useState(false);
  const [musicNumber, setMusicNumber] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [musicTitle, setMusicTitle] = useState(null);
  const [artist, setArtist] = useState(null);
  const [music, setMusic] =useState(null);
  const [isSongInfoVisible, setIsSongInfoVisible] = useState(false); // 곡 정보 창의 표시 여부 상태

  const tokens = Cookies.get('token');

  //토큰 유무 확인
  useEffect(() => {
		if (
			!Cookies.token ||
			Cookies.token === undefined ||
			Cookies.token === "undefined"
		) {
			setLogin(false);
		} else {
			setLogin(true);
		}
	}, [Cookies.token]);

  const location = useLocation();
  //social에서 받아오기
  useEffect(() => {
    if (location.state?.track) {
      setTrack(location.state.track);  // 전달받은 track 설정
      setMusicNumber(location.state.musicNumber);  // 전달받은 songId 설정
      console.log([track]);
      setisPlay(true);  // 자동 재생 설정
    }
  }, [location.state]);

  useEffect(() => {
    if(location.state?.playlistId){
      setPlaylistId(location.state.playlistId);
    }
  }, [location.state]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // 새로고침 직전에 localStorage에서 track과 musicNumber를 삭제
      localStorage.removeItem('track');
      localStorage.removeItem('musicNumber');
      
    window.addEventListener('beforeunload', handleBeforeUnload);
      setTrack([]); // 상태 초기화
      setMusicNumber(null); // 상태 초기화
    };

    // 새로고침 또는 페이지 닫기 이벤트 감지

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  //노래 정보 열기기
  const handleToggleSongInfo = () => {
    setIsSongInfoVisible(!isSongInfoVisible); // 클릭 시 곡 정보 표시 여부를 토글
  };
  //노래 정보 닫기
  const handleToggleOff = () =>{
    setIsSongInfoVisible(!isSongInfoVisible);
  }

  useEffect

  const hadleClickPre = () => {
      // 현재 musicNumber가 track 배열의 몇 번째에 있는지 찾기
      const currentIndex = track.indexOf(musicNumber);

      // 이전 곡으로 이동
      const prevIndex = currentIndex === 0 ? track.length - 1 : currentIndex - 1;

      // musicNumber를 track에서의 이전 songId로 설정
      setMusicNumber(track[prevIndex]);
  };

  const handleClickNext = () => {
    // 현재 musicNumber가 track 배열의 몇 번째에 있는지 찾기
    const currentIndex = track.indexOf(musicNumber);

    // 다음 곡으로 이동
    const nextIndex = currentIndex === track.length - 1 ? 0 : currentIndex + 1;

    // musicNumber를 track에서의 다음 songId로 설정
    setMusicNumber(track[nextIndex]);
  };

  const changeBackground = () => {
    setAnimating(true); // 애니메이션 시작
    setTimeout(() => {
      setAnimating(false); // 애니메이션 종료
    }, 500); // 페이드 아웃 시간과 일치
  };

  useEffect(() => {
    if(musicNumber){
    const fetchSongInfo = async () => {
      const token = tokens;
    
      try {
        const response = await Axios.get(`/music/info/${musicNumber}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).then((response) => {
          // 썸네일을 사용할지 기본 이미지를 사용할지 결정
          const newThumbnail = response.data.result.thumbnail || nonmain;

          // 애니메이션 시작 (페이드 아웃)
          changeBackground();

          // 페이드 아웃 후에 이미지 변경
          setTimeout(() => {
            setBackimg(newThumbnail); // 새로운 이미지 설정
            setArtist(response.data.result.artist); // 아티스트 이름 설정
            setMusicTitle(response.data.result.title); // 곡 제목 설정
            setCurrentSong(response.data.result); // 곡 정보 업데이트
            setMusic(response.data.result.media);
          }, 1000); // 페이드 아웃 시간 후에 이미지 변경
        })
        // 데이터를 상태에 저장
      } catch (err) {
        // setError(err.message);
        // setLoading(false);
      }
    };
    fetchSongInfo();
  }
  }, [musicNumber]);

  function handleCreateBtn(){
    window.location.href = '/create';
  }

  return (
    <ThemeProvider theme={Theme}>
        <GlobalStyle/>
        <FieldWrapper>
          <SideMenu/>
          <Credit login={login} tokens={tokens}/>
          <MainField animating={animating} backimg={backimg} onClick={handleToggleSongInfo}>
            {!isPlay && (<div>
              <Stationary>As you imagine<br/>unfold the music<br/>of your dreams!</Stationary>
              <StartBtn onClick={handleCreateBtn}>Create</StartBtn>
              </div>
            )}
          </MainField>
          {isSongInfoVisible && isPlay && ( // 곡 정보가 표시될 때만 나타남
          <SongInfoWrapper onClick={handleToggleOff}>
            <SongTitle>{currentSong?.title}</SongTitle>
            <About>{currentSong?.about}</About>
            <LyricsWrapper>
              <LyricsTitle>Lyrics</LyricsTitle>
              {currentSong?.lyrics?.map((lyric, index) => (
                <Lyric key={index}>{lyric.content}</Lyric>
              ))}
            </LyricsWrapper>
          </SongInfoWrapper>
        )}
          <Wave music={music} musicTitle={musicTitle} artist={artist} />
          <Profile login={login} tokens={tokens}/>
          <Playlist tokens={tokens} playlistId={playlistId} setisPlay={setisPlay} setTrack={setTrack} setMusicNumber={setMusicNumber} track={track} musicNumber={musicNumber}/>
          <TopRank setisPlay={setisPlay} setTrack={setTrack} setMusicNumber={setMusicNumber} track={track} musicNumber={musicNumber}/>
          <MusicPlayer>
          <AudioPlayer
            key={musicNumber} 
            style={{ borderRadius: "20px", backgroundColor: "black", color: "white", width:"788", height:"125px" }}
            src={`${currentSong?.media}`}
            autoPlay={true}  // true로 설정하면 컴포넌트가 로드될 때 자동 재생
            showSkipControls={true}  // 이전, 다음 트랙 버튼 표시
            onClickPrevious={hadleClickPre}  // 이전 버튼 클릭 핸들러
            onClickNext={handleClickNext}    // 다음 버튼 클릭 핸들러
            showJumpControls={false}         // 건너뛰기 버튼 숨김
            layout="stacked-reverse"         // 커스텀 레이아웃 (선택 사항)
          />
          </MusicPlayer>
        </FieldWrapper>
    </ThemeProvider>
  )
}

export default Home

const FieldWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: ${Theme.colors.darkGray};
  overflow-y: auto;
`

const MainField = styled.div`
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

  background-image: url(${(props) => props.backimg});
  background-size: cover;
  background-position: 50% 50%;
  
  z-index: 0;

  animation: ${(props) => (props.animating ? fadeOut : fadeIn)} 1s ease-in-out;
  
  
  :img{
    background-size: none;
    object-position: 50% 50%;
  }
`

const MusicPlayer = styled.div`
    position: absolute;
    top: 885px;
    left: 803px;
    width: 788px;
    height: 125px;

    --rhap_theme-color: #868686;
    --rhap_bar-color: #868686; /* Progress bar 색상도 바꾸고 싶을 경우 */
    --rhap_time-color: #868686; /* 타이머 색상도 함께 변경 */
`    


const CreditContainer = styled.div`
    background: #000000;
    border-radius: 70px;
    width: 249px;
    height: 93px;
`;

const fadeIn = keyframes`
  from {
    transform: translateY(130%);
  }
  to {
    transform: translateY(0%);
  }
`;

const fadeOut = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-100%);
  }
`;

const StartBtn = styled.div`
  margin-left:127px;
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${Theme.colors.black};
  border-radius: 40px;
  width: 393px;
  height: 80px;

  ${Theme.fonts.title}
  line-height: 40px;
  color: ${Theme.colors.white};
`

const Stationary = styled.p`
  margin-top: 278px;
  margin-left: 74px;
  ${Theme.fonts.title}
  font-weight: 500;
  font-size: 80px;
  line-height: 80px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${Theme.colors.white};
`;

const SongInfoWrapper = styled.div`
  position: absolute;
  margin-top: 200px;
  /* position: relative; */
  /* z-index: 1; */
  width: 1400px;
  height: 500px;
  margin-left: 345px;
  background-color: black;
  background-color: rgba(0,0,0,0.4);
  color: white;
  padding: 20px;
  border-radius: 40px;
  z-index: 10;
`;

const SongTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  /* ${Theme.fonts.title} */
`;

const About = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

const LyricsWrapper = styled.div`
  margin-top: 40px;
`;
const LyricsTitle = styled.h2`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Lyric = styled.p`
  font-size: 25px;
  line-height: 1.6;
  margin-bottom: 10px;
  ${Theme.fonts.lyrics}
`;