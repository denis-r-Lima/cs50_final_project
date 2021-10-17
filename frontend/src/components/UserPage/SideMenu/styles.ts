import styled, { keyframes } from "styled-components";

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
`;

export const BurgerBar = styled.div`
  width: 1.5rem;
  height: 0.25rem;
  background-color: #fff;
  border-radius: 1rem;
  transition: all linear 0.3s;
`;

export const Menu = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 15vw;
  background-color: #333;
  transform: translateX(-100%);
  transition: transform linear 0.3s;
  padding: 5rem 0rem 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f1f2f1;

  &.show {
    transform: translateX(0);
  }

  & > span {
    text-align: justify;
    padding: 1rem;
  }
`;

export const QrCodeDiv = styled.div`
  text-align: center;
  padding: 0 1rem;

  display: grid;
  gap: 1rem;
  place-items: center;
`;

export const MenuItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  width: 100%;
  padding: 1rem;
  cursor: pointer;

  & > div {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
  }

  &:hover {
    background-color: rgba(220, 220, 220, 0.3);
  }

  &.current {
    background-color: rgba(220, 220, 220, 0.1);
  }
`;
const EngineAnimation = keyframes`
    0%{transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
`;

const GeneralAnimation = keyframes`
    0%{transform: rotate(0deg);}
    25%{transform: rotate(10deg);}
    50%{transform: rotate(0deg);}
    75%{transform: rotate(-10deg);}
    100%{transform: rotate(0deg);}
`;

export const EngineMenuItem = styled(MenuItem)`
  &:hover {
    & svg {
      animation-name: ${EngineAnimation};
      animation-duration: 2.5s;
      animation-iteration-count: infinite;
    }
  }
`;

export const GeneralMenuItem = styled(MenuItem)`
  &:hover {
    & svg {
      animation-name: ${GeneralAnimation};
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
`;
