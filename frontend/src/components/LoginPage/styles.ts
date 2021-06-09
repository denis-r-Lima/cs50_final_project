import styled from 'styled-components'

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('https://wallpapercave.com/wp/fIIR22G.jpg') no-repeat fixed
    center;
  background-size: cover;
  filter: grayscale(50%) blur(5px);
`

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  overflow-x: hidden;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 5rem auto;
  grid-template-columns: 100%;
  & > div {
    margin: auto;
  }
`

export const LoginDiv = styled.div`
  max-width: 25rem;
  min-width: 20rem;
  background-color: rgba(238, 238, 238, 0.7);
  border-radius: 0.625rem;
  padding: 3rem;

  display: grid;
  place-items: center;
`

export const Register = styled.div`
  position: absolute;
  top: calc(50% + 3rem);
  left: 50%;
  max-width: 30rem;
  min-width: 25rem;
  padding: 3rem;
  background-color: rgba(238, 238, 238, 1);
  border-radius: 0.625rem;

  display: grid;
  place-items: center;

  transform: translate(50vw, -50%);
  transition: transform linear 0.4s;

  &.show {
    transform: translate(-50%, -50%);
  }
`

export const StyledForm = styled.form`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > p{
    color: red;
    font-size: 0.8rem;
  }

  & > fieldset {
    border: 1px solid #999;
    border-radius: 0.5rem;

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

      &::placeholder{
        color: #999;
      }
    }
  }
  & > button {
    padding: 0.625rem;
    background-color: #333;
    color: #eeeeee;
    border-radius: 0.625rem;
    cursor: pointer;
  }
`

export const TextButton = styled.button`
  padding: 0;
  background-color: transparent;
  color: inherit;
  border-radius: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
`
