import styled from 'styled-components'

export const DisplayDate = styled.div`
  width: 25rem;
  padding: 0.625rem 2rem;
  background-color: rgba(200, 200, 200, 0.7);
  border-radius: 0.625rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > svg {
    cursor: pointer;
    font-size: 1.2rem;
  }
`

export const AppointmentList = styled.ul`
  list-style-type: none;
  width: 100%;
  margin: 1rem 0;

  & > li:nth-child(even) {
    background-color: rgba(220, 220, 220, 0.6);
  }

  & > li {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.625rem;
    gap: 2rem;

    & > div:first-child {
      position: relative;
      height: auto;
      display: grid;
      place-items: center;
      font-weight: bolder;
      font-size: 1.3rem;

      &::after {
        content: '';
        position: absolute;
        right: -1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 1.5rem;
        background-color: rgba(190, 190, 190, 1);
      }
    }
  }
  & > p {
    text-align: center;
  }
`
