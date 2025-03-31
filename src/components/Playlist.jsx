import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import { Axios } from '../api/Axios';
import Cookies from 'js-cookie';
import PL from '../img/playlist.png';

function Playlist({
  // tokens,
  playlistId,
  setisPlay,
  setTrack,
  track,
  setMusicNumber,
  musicNumber
}) {
  const [select, setSelect] = useState(-1);
  const [playlist, setPlaylist] = useState([]);
  const [songs, setSongs] = useState([]);

  const tokens = Cookies.get('token');
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

  // useEffect(() => {
  //   const fetchPlaylists = async () => {
  //     const token = tokens;

  //     try {
  //       const response = await Axios.get(`/music/playlist/${playlistId}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       // .then((response) => {
  //       //   console.log(response);
  //       // })
  //       setPlaylist(response.data.result);
  //       setSongs(response.data.result.songs || []);
        
  //       const songIds = response.data.result.songs.map(song => song.song_id);
  //       setTrack(songIds || []); // 전체 트랙 리스트를 설정
  //       // 데이터를 상태에 저장
  //       // setLoading(false);
  //       return({

  //       }
  //       )
  //     } catch (err) {
  //       // setError(err.message);
  //       // setLoading(false);
  //     }
  //   };
  //   fetchPlaylists();
    
  // }, [playlistId]);

  useEffect(() => {
    if (!playlistId || playlistId === -1) return; // 유효하지 않으면 무시
  
    const fetchPlaylists = async () => {
      try {
        const response = await Axios.get(`/music/playlist/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        });
  
        const data = response.data.result;
        setPlaylist(data);
        setSongs(data.songs || []);
        const songIds = data.songs.map(song => song.song_id);
        setTrack(songIds || []);
      } catch (err) {
        console.error("플레이리스트 불러오기 실패:", err);
      }
    };
  
    fetchPlaylists();
  }, [playlistId]);

  const handleListClick = (songId) => {
    setMusicNumber(songId); // 선택된 곡의 songId를 Home.js에 전달
    setisPlay(true);
    console.log(songId);
  };

  return (
    <FieldWrapper>
      <Listtitle>PlayList</Listtitle>
      <ContentWrapper>
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <Content
              key={song.song_id}
              isSelected={musicNumber === song.song_id} // 선택된 항목에 스타일 적용
              as='button'
              onClick={() => {
                setSelect(index);
                handleListClick(song.song_id);
              }}
            >
              <Line
                key={song.song_id}
                isSelected={musicNumber === song.song_id} // 선택된 항목에 스타일 적용
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
                src={song.thumbnail}
                alt={`playlist ${index + 1}`}
              />
              <MusicContent>
                <MusicTitle
                  key={song.song_Id}
                  isSelected={musicNumber === song.song_id} // 선택된 항목에 스타일 적용
                  // as="button"
                  onClick={() => setSelect(index)}
                >
                  {song.song_title}
                </MusicTitle>
                {/* <Artist>{playlist.userName}</Artist> */}
              </MusicContent>
            </Content>
          ))
        )
         : (
          <div>No playlists available</div> // 플레이리스트가 없을 때 표시
        )
        }
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
