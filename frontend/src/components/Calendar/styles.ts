import styled from 'styled-components'

export const Container = styled.div`
  & table {
    border-collapse: separate;
    border-spacing: 0.5rem 0.5rem;

    & th,
    td {
      text-align: center;
      border-radius: 0.625rem;
    }

    & th{
        background-color: #eee;
        gap: 1rem;
        padding: 0.5rem;
    }

    & td{
        background-color: #333;
        color: #e1e3e1;
        padding: 1rem;
        cursor: pointer;

        &.outdated{
            opacity: 50%;
            cursor: not-allowed;
        }
    }
  }

  & h4{
    text-align: center;
    margin-bottom: 1rem;
  }
`

export const Modal = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    transform: translateY(-100%);
    opacity: 0;

    transition: opacity 0.3s linear 0.2s, transform 0.5s linear 0.2s, background-color linear 0.2s;

    &.show{
    transform: translateY(0%);
    opacity: 1;
    background-color: rgba(0,0,0,0.7);
    transition: opacity 0.3s ease-out 0.2s, transform  0.4s linear, background-color 0.6s linear 0.3s;
    }
`