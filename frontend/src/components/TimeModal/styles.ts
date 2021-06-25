import styled from 'styled-components'

export const Container = styled.div`
  width: fit-content;
  max-height: 90vh;
  background-color: #fff;
  padding: 2rem;
  margin: 10vh auto;
  overflow-y: auto;
  border-radius: 0.625rem;

  & h2 {
    text-align: center;
  }

  & ul {
    list-style: none;
    margin: 1rem 0;
  }

  & li {
    width: 100%;
    text-align: center;
    font-size: 1.3rem;
    border: 1px solid #999;
    padding: 0.625rem;
    margin: 0.3rem 0;
    transition: all linear 0.3s;
    cursor: pointer;


    &.occupied{
      opacity: 0.3;
      cursor: not-allowed;
      &:hover{
        background-color: transparent;
        color: #333;
      }
    }
  }

  & li:hover {
    background-color: #999;
    color: #f1f2f3;
  }
`

export const ClientModal = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  & div {
    background-color: #eee;
    border-radius: 0.625rem;
  padding: 2rem;

  }

  & fieldset {
    border: 1px solid #999;
    border-radius: 0.5rem;
    position: relative;

    width: 80%;
    margin: 0.625rem auto;

    & > legend {
      padding: 0.3rem;
      margin-left: 0.4rem;
      font-size: 0.8rem;
      font-weight: bold;
      color: #777;
    }

    & > input {
      background-color: transparent;
      outline: none;
      padding: 0.3rem 0.625rem;
      position: relative;
    }
  }

  & button {
    width: 80%;
    padding: 0.625rem;
    background-color: #333;
    color: #eeeeee;
    border-radius: 0.625rem;
    cursor: pointer;
    margin: 0.625rem 10%;
  }

  &.display {
    display: grid;
    place-items: center;
  }

`
