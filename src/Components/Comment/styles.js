import styled from 'styled-components'

export const Container = styled.div`
  background: rgba(128, 128, 128, 0.1411764705882353);
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  `

export const Info = styled.div`
margin-top: 5px; 
color: gray;


& a {
  color: ${({theme}) => theme.text};
}
`