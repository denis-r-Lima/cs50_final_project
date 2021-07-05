import styled from 'styled-components';

export const Content = styled.div`
  min-width: 40vw;  
  padding: 3rem 3rem;
  background-color: #f9faf9;
  border-radius: 0.625rem;
  box-shadow: 0px 0px 3px 1px  rgba(200, 200, 200, 0.6);
  height: fit-content;
`;

export const ItemDiv = styled.div`
  padding: 1rem 1.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  place-items: center start;


  & > div:last-child{
    display: flex;
    justify-content: flex-end;
    place-self: center end;

  }

  & a{
    color: inherit;
    text-decoration: underline;
  }

  & input{
    background-color: transparent;
    padding: 0.625rem;
    width: 100%;
    text-align: right;
    border-width: 0 0 1px 1px;
    border-color: #ddd;
    border-style: solid;
    outline: none;
    border-radius: 0 0 0 0.625rem;
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