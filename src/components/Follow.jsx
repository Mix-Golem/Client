import React from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';

import PL from '../img/playlist.png';

const Follow = ({ followlist }) => {
  let followingCount;
  let followerCount;
  if (followlist) {
    followingCount = followlist.followingList.length;
    followerCount = followlist.followerList.length;
  } else {
    followingCount = followerCount = '';
  }

  return (
    <FollowContainer>
      <FollowTitle>Follow</FollowTitle>
      <FollowStats>
        <StatItem>
          <StatNumber onClick={() => console.log(followlist)}>
            {followingCount}
          </StatNumber>
          <StatLabel>Following</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{followerCount}</StatNumber>
          <StatLabel>Followers</StatLabel>
        </StatItem>
      </FollowStats>
    </FollowContainer>
  );
};

export default Follow;

const FollowContainer = styled.div`
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

const FollowTitle = styled.h1`
  margin-top: 30px;
  text-align: center;
  color: ${Theme.colors.white};
  ${Theme.fonts.title};
  font-size: 40px;
  line-height: 40px;
`;

const FollowStats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 30px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${Theme.fonts.list};
`;

const StatNumber = styled.div`
  font-size: 80px;
  color: ${Theme.colors.white};
  font-weight: bold;
`;

const StatLabel = styled.div`
  margin-top: 10px;
  font-size: 28px;
  color: ${Theme.colors.white};
`;
