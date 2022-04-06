import styled from 'styled-components'
import { space } from '../theme'

export const FullWidthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space()};
  margin: 3em 0;

  a, button {
    white-space: normal;
    word-break: break-word;
  }
`
