import React from 'react'
import styled from 'styled-components'
import { Theme } from '../styles/Theme'

function TopRank() {


  return (
    <FieldWrapper>
        <Ranktitle>Top Rank</Ranktitle>
    </FieldWrapper>
  )
}

export default TopRank

const FieldWrapper = styled.div`
    position: absolute; 
    width: 280px;
    height: 624px;
    left: 1670px;
    top: 385px;
    background: ${Theme.colors.black};
    border-radius: 70px;
`
const Ranktitle = styled.p`
    margin-top: 30px;
    /* position: relative; */
    /* display: flex; */
    text-align: center;
    ${Theme.fonts.title}
    color: ${Theme.colors.white};
    font-size: 40px;
    line-height: 40px;
`

const RankContentWrapper = styled.div`
    
`