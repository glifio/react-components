import styled, { css } from 'styled-components'
import { space } from '../theme'

export const Label = styled.label`
  display: flex;
  gap: ${space()};

  ${props =>
    props.vertical
      ? css`
          flex-direction: column;
        `
      : css`
          align-items: center;
          justify-content: space-between;

          > *:first-child {
            display: flex;
            flex-direction: column;
          }

          > *:last-child {
            flex: 0 0 50%;
          }
        `}

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
