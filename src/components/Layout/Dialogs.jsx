import styled from 'styled-components'
import { space } from '../theme'

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space()};
  width: 100%;
  max-width: 35em;

  form {
    display: flex;
    flex-direction: column;
    gap: ${space()};
  }
`
