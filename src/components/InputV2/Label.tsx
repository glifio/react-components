import styled, { css } from 'styled-components'
import { space } from '../theme'

export const Label = styled.label`
  display: flex;
  gap: ${space()};
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
            flex: 0 0 50%;
          }
        `}

  span.info,
  span.error {
    font-size: 0.875rem;
  }

  span.error {
    color: var(--red-medium);
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    gap: ${space()};

    > *:first-child {
      flex: 1 0 auto;
    }

    > *:not(:first-child) {
      flex: 0 0 auto;
      transition: transform 0.1s ease-out;

      &:hover:not(:active) {
        transform: scale(1.2);
      }

      &:active {
        transition: none;
      }
    }
  }

  .unit-wrapper {
    position: relative;

    input {
      width: 100%;
    }

    .unit {
      position: absolute;
      top: 50%;
      right: 1em;
      transform: translateY(-50%);
      color: var(--purple-medium);

      ${props =>
        props.error &&
        css`
          color: var(--red-dark) !important;
        `}

      ${props =>
        props.disabled &&
        css`
          color: var(--gray-dark) !important;
        `}
    }
  }

  .select-wrapper {
    position: relative;

    select {
      width: 100%;
      appearance: none;
    }

    .select-arrow {
      position: absolute;
      pointer-events: none;
      top: 50%;
      right: 1.2em;
      width: 0.6em;
      height: 0.6em;
      border-right: 1.5px solid var(--black);
      border-bottom: 1.5px solid var(--black);
      transform: translateY(-0.35em) rotate(45deg);

      ${props =>
        props.disabled &&
        css`
          border-color: var(--gray-dark);
        `}
    }
  }

  .info-wrapper {
    padding: 0.7em 1em;
  }
`
