import styled from 'styled-components'
import { space } from '../theme'

export const FullWidthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space()};
  margin: 3em 0;

  a,
  button {
    white-space: normal;
    word-break: break-word;
  }
`

export const ButtonRow = styled.div`
  display: flex;
  gap: ${space()};
  margin: 3em 0;
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
