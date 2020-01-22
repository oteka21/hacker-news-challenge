import styled, { css } from 'styled-components'


export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
  min-height: 100%;
  background: ${({theme}) => theme.background};
  color: ${({theme }) => theme.text};
  transition: all .2s ease-in-out;
`

export const Info = styled.div`
  margin-top: 5px; 
  color: gray;


  & a {
    color: ${({theme}) => theme.text};
  }
`

export const row = css`
  display: flex;
  flex-direction: row;
`

export const spaceBetweet = css`
  justify-content: space-between;
`

export const BtnClear = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`
export const Title = styled.h1`
  color: ${({theme}) => theme.title};
  text-decoration: none;
  font-weight: bold;
`