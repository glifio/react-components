import styled from 'styled-components'
import { Spaces } from '../theme'

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.MEDIUM};
  width: 100%;
  margin: 0 auto;
  max-width: 40em;

  form {
    display: flex;
    flex-direction: column;
    gap: ${Spaces.MEDIUM};
  }
`

export const WideDialog = styled(Dialog)`
  max-width: 50em;
`
