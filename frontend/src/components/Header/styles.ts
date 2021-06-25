import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Logo = styled.h2`
  font-family: 'Calistoga', cursive;
  color: #2f2f2f;
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgba(238, 238, 238, 0.6);
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