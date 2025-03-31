import {React, useEffect, useState} from 'react'
import styled from 'styled-components'
import { Theme } from '../styles/Theme'
import { Axios } from '../api/Axios'
import { useNavigate } from 'react-router-dom'

import fst from '../img/t1.jpg'
import snd from '../img/t1.jpg'
import trd from '../img/t1.jpg'

function TopRank({ setisPlay, setTrack, setMusicNumber, track, musicNumber }) {
    const [topSongs, setTopSongs] = useState([]);
    const [todaySongs, setTodaySongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const fetchRankData = async () => {
        try {
          const topResponse = await Axios.get('/social/rank/top'); // 탑 랭크 호출
          const todayResponse = await Axios.get('/social/rank/today'); // 투데이 랭크 호출
    
          setTopSongs(topResponse.data.result.topsongs); // 탑 랭크 데이터 저장
          setTodaySongs(todayResponse.data.result.todaysongs); // 투데이 랭크 데이터 저장
          setLoading(false); // 로딩 상태 업데이트
          console.log(topResponse);
          console.log(todayResponse);
        } catch (err) {
          console.error('Error fetching rank data:', err);
        }
      };
    
      useEffect(() => {
        fetchRankData(); // 컴포넌트가 마운트될 때 데이터 호출
      }, []);

    const handleTopRankClick = (songId) => {
      // 현재 페이지가 '/'가 아니라면 '/'로 이동
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
      const songIds = topSongs.map(song => song.songId)
      setTrack(songIds); // 전체 트랙 리스트를 설정
      setMusicNumber(songId); // 선택된 곡의 songId를 Home.js에 전달
      setisPlay(true);
      console.log(songId);
    }

    const handleTodayRankClick = (songId) => {
      // 현재 페이지가 '/'가 아니라면 '/'로 이동
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
      const songIds = todaySongs.map(song => song.songId)
      setTrack(songIds); // 전체 트랙 리스트를 설정
      setMusicNumber(songId); // 선택된 곡의 songId를 Home.js에 전달
      setisPlay(true);
      console.log(track);
      console.log(musicNumber);
    }
    


  return (
    <FieldWrapper>
        <Ranktitle>Top Rank</Ranktitle>
        <Line/>
        <RankContentWrapper>
        {topSongs.slice(0, 3).map((song, index) => (
          <ContentWrapper key={index} onClick={() => handleTopRankClick(song.songId)}>
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
            </RankContent>
          </ContentWrapper>
        ))}
      </RankContentWrapper>
        <Line/>
        <Ranktitle style={{marginTop:"15px", marginBottom:"20px"}}>Today</Ranktitle>
        { todaySongs.slice(0, 1).map((song, index) => (
        <ContentWrapper key={index} onClick={() => handleTodayRankClick(song.songId)} style={{marginLeft:"30px"}}>
        <RankContent>
          <img
            style={{
              width: '78px',
              height: '78px',
              borderRadius: '20px',
            }}
            src={song.thumbnail}
            alt='Today 1st'
          />
          <div style={{ marginLeft: '10px' }}>
            <Musictitle>{song.title}</Musictitle>
            <MusicArtist>{song.userName}</MusicArtist>
          </div>
        </RankContent>
        </ContentWrapper>
      ))}
    </FieldWrapper>
  )
}

export default TopRank

const FieldWrapper = styled.div`
    position: absolute; 
    width: 280px;
    height: 624px;
    left: 1634px;
    top: 385px;
    background: ${Theme.colors.black};
    border-radius: 70px;
`
const Ranktitle = styled.p`
    margin-top: 30px;
    margin-bottom: 38px;
    /* position: relative; */
    /* display: flex; */
    text-align: center;
    ${Theme.fonts.title}
    color: ${Theme.colors.white};
    font-size: 40px;
    line-height: 40px;
`

const RankContentWrapper = styled.div`
    width: 280px;
    height: 310px;
    overflow-y: auto;
    justify-content: center;
    display: static;

    &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    }
    &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`

const Line = styled.div`
    
    width: 216px;
    height: 0px;
    margin-left: 32px;
    /* justify-content: center;
    align-items: center;
    display: flex; */

    border: 1px solid #FFFFFF;
`

const ContentWrapper = styled.div`
    cursor: pointer;
    margin-top: 17px;
    width: 250px;
    height: 78px;
    display: flex;
    align-items: center;
`

const Number = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    ${Theme.fonts.songTitle}
    color: ${Theme.colors.white};
    font-size: 35px;
    line-height: 40px;
`
const RankContent = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
`
const Musictitle = styled.div`
    ${Theme.fonts.songTitle}
    font-size: 25px;
    /* identical to box height */

    color: ${Theme.colors.white}
`
const MusicArtist = styled.div`
    ${Theme.fonts.songArtist}
    color: ${Theme.colors.gray};
    font-size: 15px;
`