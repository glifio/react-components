import styled from 'styled-components'
import { Spaces } from '../theme'

export const FullWidthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.MEDIUM};
  margin: 3em 0;

  a,
  button {
    white-space: normal;
    word-break: break-word;
  }
`

export const ButtonRow = styled.div`
  display: flex;
  gap: ${Spaces.MEDIUM};
  margin: 1.5em 0;
`

export const ButtonRowRight = styled(ButtonRow)`
  justify-content: flex-end;
`

export const ButtonRowCenter = styled(ButtonRow)`
  justify-content: center;
`

export const ButtonRowSpaced = styled(ButtonRow)`
  justify-content: space-between;
`
