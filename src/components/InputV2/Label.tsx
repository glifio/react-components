import styled, { css } from 'styled-components'
import { space } from '../theme'

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${space()};

  > *:first-child {
    display: flex;
    flex-direction: column;
  }

  > *:last-child {
    flex: 0 0 50%;
    text-align: right;
  }

  span.error {
    color: var(--red-medium);
    font-size: 0.875rem;
  }

  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
    `}
`
