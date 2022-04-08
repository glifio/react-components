import styled, { css } from 'styled-components'
import { space } from '../theme'

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${space()};

  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
    `}
`
