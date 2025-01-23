
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Theme } from '../styles/Theme'
import {Axios} from '../api/Axios'

import PL from '../img/playlist.png'

function Playlist({ tokens, playlistId, setisPlay, setTrack, track, setMusicNumber}) {

    const [play, setplay] = useState(true);
    const [select, setSelect] = useState(-1);
    const [playlist, setPlaylist] = useState([]);

    // const fetchPlaylists = async () => {
    //     try {
    //       const response = await Axios.get('/social/rank/top'); // 플리 호출
    
    //       setPlaylist(response.data.result.topsongs); // 플리 저장
    //     //   setLoading(false); // 로딩 상태 업데이트
    //       console.log(response);
    //     } catch (err) {
    //       console.error('Error fetching rank data:', err);
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchPlaylists(); // 컴포넌트가 마운트될 때 데이터 호출
    //   }, []);

    useEffect(() => {
        const fetchPlaylists = async () => {
          const token = tokens;
        
          try {
            const response = await Axios.get(`/music/playlist/${playlistId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
            // .then((response) => {
            //   console.log(response);
            // })
            setPlaylist(response.data.result);
            // 데이터를 상태에 저장
            // setLoading(false);
          } catch (err) {
            // setError(err.message);
            // setLoading(false);
          }
        };
        fetchPlaylists();
      }, []);
    const handleListClick = (songId) => {
        setTrack(playlist); // 전체 트랙 리스트를 설정
        setMusicNumber(songId); // 선택된 곡의 songId를 Home.js에 전달
        setisPlay(true);
        console.log(songId);
        }

  return (
    <FieldWrapper>
      <Listtitle>PlayList</Listtitle>
      <ContentWrapper>
        {playlist.length > 0 ? (
          playlist.map((playlist, index) => (
            <Content
              key={playlist.playlistId}
              isSelected={index === select}  // 선택된 항목에 스타일 적용
              as="button"
              onClick={() => {setSelect(index); handleListClick(playlist.songId);}}
            >
            <Line
                key={playlist.playlistId}
                isSelected={index === select}  // 선택된 항목에 스타일 적용
              key={playlist.playlist_id}
              isSelected={index === select} // 선택된 항목에 스타일 적용
              as='button'
              onClick={() => {
                setSelect(index);
                handleListClick(playlist.songId);
              }}
            >
              <Line
                key={playlist.playlist_id}
                isSelected={index === select} // 선택된 항목에 스타일 적용
                // as="button"
                onClick={() => setSelect(index)}
              />
              <img
                style={{
                  width: '65px',
                  height: '65px',
                  borderRadius: '20px',
                  marginLeft: '26px',
                }}
                src={playlist.thumbnail}
                alt={`playlist ${index + 1}`}
              />
              <MusicContent>
                <MusicTitle
                  key={playlist.playlist_id}
                  isSelected={index === select} // 선택된 항목에 스타일 적용
                  // as="button"
                  onClick={() => setSelect(index)}
                >
                  {playlist.playlist_title}
                </MusicTitle>
                {/* <Artist>{playlist.userName}</Artist> */}
              </MusicContent>
            </Content>
          ))
        ) : (
          <div>No playlists available</div> // 플레이리스트가 없을 때 표시
        )}
      </ContentWrapper>
    </FieldWrapper>
  );
}

export default Playlist;

const FieldWrapper = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 3;
  width: 401px;
  height: 278px;
  left: 312px;
  top: 765px;

  -webkit-mask-image: url(${PL});
  mask-image: url(${PL});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  /* border-right: 20px solid transparent;
 border-bottom: 50px solid gray;
 border-left: 50px solid gray; */

  background: ${Theme.colors.black};
  border-radius: 40px;
`;

const Listtitle = styled.p`
  margin-top: 30px;
  margin-right: 0px;
  /* position: relative; */
  /* display: flex; */
  text-align: center;
  ${Theme.fonts.title}
  color: ${Theme.colors.white};
  font-size: 40px;
  line-height: 40px;
`;

const ContentWrapper = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  display: static;
  /* align-items: center; */
  overflow-y: auto;
  margin-top: 10px;
  width: 400px;
  height: 225px;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const Content = styled.div`
  cursor: pointer;
  width: 400px;
  height: 75px;
  display: flex;
  align-items: center;
  /* margin-left: 27px; */
  border-style: none;
  /* border-left: ${(props) =>
    props.isSelected ? '2px solid #FFFFFF' : 'none'}; */
  background: ${(props) =>
    props.isSelected
      ? 'linear-gradient(270deg, #D9D9D9 28.08%, #81D8F3 100%)'
      : 'black'};
`;

const Line = styled.div`
  margin-left: 27px;
  width: 0;
  height: 32px;
  margin-bottom: 23px;
  border: ${(props) => (props.isSelected ? '1px solid #FFFFFF' : 'none')};
`;
const MusicContent = styled.div`
  /* display: flex; */
  margin-left: 17px;
  position: static;
  align-items: center;
  text-align: left;
  flex-grow: 1;
`;

const MusicTitle = styled.div`
  /* text-align: left; */
  ${Theme.fonts.songTitle}
  font-size: 18px;
  color: ${(props) => (props.isSelected ? 'black' : 'white')};
`;

const Artist = styled.div`
  margin-top: 5px;
  ${Theme.fonts.songArtist}
  color: ${Theme.colors.gray};
  font-size: 12px;
`;
