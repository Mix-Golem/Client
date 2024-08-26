import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';

const History = ({ history }) => {
  //   useEffect(() => {
  //     setHistory(history);
  //   }, [history]);

  return (
    <HistoryWrapper>
      <HistoryTitle>History</HistoryTitle>
      <HistoryListWrapper>
        {/* history map logic */}
        <HistoryList></HistoryList>
      </HistoryListWrapper>
    </HistoryWrapper>
  );
};

export default History;

const HistoryWrapper = styled.div`
  position: absolute;
  width: 415px;
  height: 796px;
  left: 855px;
  top: 23px;
  padding-right: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background: ${Theme.colors.black};
`;

const HistoryTitle = styled.p`
  position: relative;
  display: flex;
  margin: 0px;
  width: auto;
  height: 84px;
  ${Theme.fonts.title}
  color: ${Theme.colors.white};

  justify-content: center;
  align-items: center;
  text-align: center;
`;

const HistoryListWrapper = styled.div`
  width: 100%;
  height: calc(100% - 84px);
  overflow-y: scroll;
  padding-left: 15px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const HistoryList = styled.div``;
