import styled from 'styled-components'

export const Container = styled.li`
  margin: 20px 0;
  list-style: none;
`

export const Title =  styled.h3`
color: ${({theme}) => theme.title};
text-decoration: none;
font-weight: bold;
`