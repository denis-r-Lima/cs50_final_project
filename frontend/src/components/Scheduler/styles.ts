import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 5rem auto 3rem;
  place-items: center;

  & > div:first-child{
    width: 100vw;
    height: 100%;
    display: grid;
    place-items: center;

    background-color: #777;
    color: #eee;

    font-family: 'Calistoga', cursive;
  }

  & > div:last-child{
    width: 100vw;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    background-color: #ccc;
    color: #444;
  }

  & span{
    font-size: 0.8rem;
  }

  & a{
    color: inherit;
    font-size: 0.8rem;
    font-family: 'Calistoga', cursive;
  }
`
