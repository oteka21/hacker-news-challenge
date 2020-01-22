import styled from 'styled-components'
import { row, spaceBetweet, BtnClear } from '../../styles'

export const Container = styled.div`
${row}
${spaceBetweet}
`

export const Button = styled(BtnClear)`
  font-size: 30px;
`

export const NavList = styled.ul`
  ${row}

  & li {
    margin-right: 10px;
    font-weight: bold;
  }
`