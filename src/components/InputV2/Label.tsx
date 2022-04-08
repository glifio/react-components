import styled, { css } from 'styled-components'
import { space } from '../theme'

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${space()};

  > *:last-child {
    flex: 0 0 50%;
    text-align: right;
  }

  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
    `}
`
