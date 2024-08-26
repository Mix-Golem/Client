import React from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';

const Follow = ({ followlist }) => {
  return (
    <FollowContainer>
      <FollowTitle>Follow</FollowTitle>
      <FollowStats>
        <StatItem>
          <StatNumber>{followlist[0].result.followings}</StatNumber>
          <StatLabel>Following</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{followlist[0].result.followers}</StatNumber>
          <StatLabel>Followers</StatLabel>
        </StatItem>
      </FollowStats>
    </FollowContainer>
  );
};

export default Follow;

const FollowContainer = styled.div`
  position: absolute;
  width: 380px;
  height: 278px;
  left: 0px;
  bottom: 0px;
  background: none;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FollowTitle = styled.h1`
  margin-right: 20px;
  color: ${Theme.colors.white};
  ${Theme.fonts.title};
  font-size: 36px;
`;

const FollowStats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 50px;
  margin-top: 20px;
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
