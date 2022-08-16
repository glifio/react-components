import styled, { css } from 'styled-components'

export const Label = styled.label`
  display: flex;
  gap: var(--space-m);
  text-align: left;

  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
    `}

  ${props =>
    props.vertical
      ? css`
          flex-direction: column;
          ${props.centered &&
          css`
            * {
              text-align: center;
            }
          `}
        `
      : css`
          align-items: center;
          justify-content: space-between;

          > *:first-child {
            display: flex;
            flex-direction: column;
          }

          > *:last-child:not(.toggle-wrapper) {
            flex: 0 0 72%;
          }
        `}

  span.info,
  span.error {
    font-size: 0.875rem;
  }

  span.error {
    color: var(--red-medium);
  }
`
