import styled from 'styled-components'
import { space } from '../theme'

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;

  > * {
    &:first-child {
      margin-bottom: ${space('small')};
    }
  }
`
