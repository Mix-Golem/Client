import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { Theme } from '../styles/Theme';
import { Axios } from '../api/Axios';
import GlobalStyle from '../styles/GlobalStyle';

import  AudioPlayer  from  'react-h5-audio-player' ;
import 'react-h5-audio-player/lib/styles.css' ; 

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

  const [login, setLogin] = useState(false);
  const [isPlay, setisPlay] = useState(false);
  const [backimg, setBackimg] = useState(t1);
  const [animating, setAnimating] = useState(false);
  const [musicNumber, setMusicNumber] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [musicTitle, setMusicTitle] = useState(null);
  const [artist, setArtist] = useState(null);
  const [music, setMusic] =useState(null);
  const [isSongInfoVisible, setIsSongInfoVisible] = useState(false); // 곡 정보 창의 표시 여부 상태

  const handleToggleSongInfo = () => {
    setIsSongInfoVisible(!isSongInfoVisible); // 클릭 시 곡 정보 표시 여부를 토글
  };

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
      const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXEiOnsiaWQiOjE2LCJuYW1lIjoi7YOI7Ye0IO2FjOyKpO2KuCIsInBob25lbnVtYmVyIjoiMDEwMTIzNDU2NzgiLCJiaXJ0aCI6IjIwMDAtMDYtMjRUMTU6MDA6MDAuMDAwWiIsImdlbmRlciI6Ik0iLCJlbWFpbCI6ImRhcmttb29uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiaGlkZGVuIiwiY3JlZGl0IjoyMDAsInByb2ZpbGUiOiJodHRwOi8vdDEua2FrYW9jZG4ubmV0L2FjY291bnRfaW1hZ2VzL2RlZmF1bHRfcHJvZmlsZS5qcGVnLnR3Zy50aHVtYi5SNjQweDY0MCIsImludHJvZHVjZSI6bnVsbCwic29jaWFsX3Byb3ZpZGVyIjpudWxsLCJyb2xlIjoiVVNFUiIsImNyZWF0ZWRfYXQiOiIyMDI0LTA4LTI1VDA1OjU3OjM2LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wOC0yNVQwNTo1NzozNi4wMDBaIiwid2l0aGRyYXdfYXQiOm51bGwsIndpdGhkcmF3X3N0YXR1cyI6MH0sImlhdCI6MTcyNzYwNTUyNn0.wRFBmXGIMxLgfLJ8gut-n1kWCxNS6PYUzzxpkyaLbEQ';
    
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

  return (
    <ThemeProvider theme={Theme}>
        <GlobalStyle/>
        <FieldWrapper>
          <SideMenu/>
          <Credit/>
          <MainField animating={animating} backimg={backimg}>
            {!isPlay && (<div>
              <Stationary>As you imagine<br/>unfold the music<br/>of your dreams!</Stationary>
              <StartBtn>Create</StartBtn>
              </div>
            )}
          </MainField>
          {isSongInfoVisible && isPlay && ( // 곡 정보가 표시될 때만 나타남
          <SongInfoWrapper>
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
          <Profile/>
          <Playlist setisPlay={setisPlay} setTrack={setTrack} setMusicNumber={setMusicNumber} track={track} musicNumber={musicNumber}/>
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
 width: 1615px;
 height: 1000px;
 margin-left: 45px;

 -webkit-mask-image: url(${background});
  mask-image: url(${background});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  background-image: url(${(props) => props.backimg});
  background-size: cover;
  z-index: 0;

  animation: ${(props) => (props.animating ? fadeOut : fadeIn)} 1s ease-in-out;
  
  
  img{
    background-size: none;
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
    transform: translateY(100%);
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
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 10;
`;

const SongTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const About = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

const LyricsWrapper = styled.div`
  margin-top: 40px;
`;
const LyricsTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Lyric = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 10px;
`;