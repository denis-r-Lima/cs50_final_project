import styled from 'styled-components';

export const Content = styled.div`
  min-width: 30vw;  
  padding: 3rem 3rem;
  background-color: #f9faf9;
  border-radius: 0.625rem;
  box-shadow: 0px 0px 3px 1px  rgba(200, 200, 200, 0.6);
  margin: 0.625rem auto;
  height: fit-content;
`;

export const ItemDiv = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;

  & > div:first-child{
    position: relative;

    &::after{
      content: '';
      position: absolute;
      top: 0;
      right: -2rem;
      width: 1px;
      background-color: #ddd;
      height: 150%;
      transform: translate( 100% , -25%);
    }

  }

  & a{
    color: inherit;
    text-decoration: underline;
  }

  & input{
    background-color: transparent;
    padding: 0.625rem;
    text-align: right;
    border-width: 0 0 1px 0;
    border-color: #ddd;
    border-style: solid;
    outline: none;
  }
`

export const H1 = styled.div`
  height: 1px;
  width: 100%;
  background-color: #ddd;
  margin: 2rem 0 ;
`
export const Button = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  margin: 2rem 0 0 0;

  & button{
    padding: 0.625rem 3rem;
    background-color: #333;
    color: #fff;
    border-radius: 0.625rem;
    cursor: pointer;
  }
`
