import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  overflow-x: hidden;
  overflow-y: hidden;
  display: grid;
  grid-template-rows: 5rem auto;
  grid-template-columns: 100%;

  background-color: #eee;

  & > div {
    margin: auto;
  }

  & > div:first-child {
    background-color: #aaa;
  }

  & > div:last-child {
    margin: 2rem auto;
  }
`

export const BurgerMenu = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 1rem;
  padding: 0.3rem;
  background-color: transparent;
  z-index: 10;
  border-radius: 0.5rem;
  display: grid;
  gap: 0.25rem;
  cursor: pointer;
  transform: translateY(-50%);

  &.opened {
    & > div {
      &:nth-child(2) {
        opacity: 0;
      }

      &:first-child {
        transform: rotate(45deg) translate(0.35rem, 0.35rem);
      }

      &:last-child {
        transform: rotate(-45deg) translate(0.35rem, -0.35rem);
      }
    }
  }
`

export const BurgerBar = styled.div`
  width: 1.5rem;
  height: 0.25rem;
  background-color: #fff;
  border-radius: 1rem;
  transition: all linear 0.3s;
`

export const Menu = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20vw;
  background-color: #bbb;
  transform: translateX(-100%);
  transition: transform linear 0.3s;
  padding: 5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.show {
    transform: translateX(0);
  }

  & > span {
    text-align: justify;
    padding: 1rem;
  }
`
export const LogOut = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2rem;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  gap: 1rem;
  color: #eee;

  & > h4:last-child {
    cursor: pointer;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top:50%;
      left: -0.5rem;
      height: 1.5rem;
      width: 1px;
      transform: translateY(-50%);
      background-color: #888;
    }
  }
`
