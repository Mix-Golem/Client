import React from 'react'
import styled, {ThemeProvider} from 'styled-components'
import { Theme } from '../styles/Theme'

import logo from '../img/Logo.svg'

function main() {
  return (
    <ThemeProvider theme={Theme}>

    </ThemeProvider>
  )
}

export default main

const LogoContainer = styled.div`
    width: 249px;
    height: 894px;
    background: #000000;
    border-radius: 70px;
`