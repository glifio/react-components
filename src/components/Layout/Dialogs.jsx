import styled from 'styled-components'
import { space } from '../theme'

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space()};
  width: 100%;
  max-width: 35em;
`

export const WideDialog = styled(Dialog)`
  max-width: 50em;
`
