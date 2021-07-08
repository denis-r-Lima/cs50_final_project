import { createGlobalStyle } from 'styled-components'
import { device } from './deviceSizes'

const GlobalStyle = createGlobalStyle`
    *, *::after, *::before{
        padding: 0;
        margin: 0;
        border: 0;
        box-sizing: border-box;
        user-select: none;
    }

    input{
        -webkit-user-select: text;
        -khtml-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
        user-select: text;
    }

    body{
        font-family: 'Roboto', sans-serif;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: #FAF5F7;
        color: #474647;
    }

    button{
        outline: none;
    }

    a{
        text-decoration: none;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    @media only screen and (${device.tablet}){
        html{
            font-size: 62.5%;
        }
    }

    @media only screen and (${device.mobileL}){
        html{
            font-size: 50%;
        }
    }
`

export default GlobalStyle
