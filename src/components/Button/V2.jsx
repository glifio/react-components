import styled, { css } from 'styled-components'
import { layout, space } from 'styled-system'
import PropTypes from 'prop-types'

const ButtonV2 = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  gap: 0.75rem;
  padding: 0.5em 0.75em;
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;

  ${props =>
    css`
      color: ${props.theme.colors.black};
      border-color: ${props.theme.colors.black};
      background: transparent;
      svg path {
        stroke: ${props.theme.colors.black};
      }

      &:hover {
        color: ${props.theme.colors.core.primary};
        border-color: ${props.theme.colors.core.primary};
        svg path {
          stroke: ${props.theme.colors.core.primary};
        }
      }

      &:active {
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.core.primary};
        svg path {
          stroke: ${props.theme.colors.white};
        }
      }
    `}

  ${props =>
    props.large &&
    css`
      font-size: 1.25em;
    `}

  ${props =>
    props.white &&
    css`
      color: ${props.theme.colors.white};
      border-color: ${props.theme.colors.white};
      svg path {
        stroke: ${props.theme.colors.white};
      }
    `}

  ${props =>
    props.green &&
    css`
      color: ${props.theme.colors.white};
      border-color: ${props.theme.colors.green.primary};
      background: ${props.theme.colors.green.primary};
      svg path {
        stroke: ${props.theme.colors.white};
      }

      &:hover {
        color: ${props.theme.colors.white};
        border-color: ${props.theme.colors.green.muted};
        background: ${props.theme.colors.green.muted};
        svg path {
          stroke: ${props.theme.colors.white};
        }
      }

      &:active {
        color: ${props.theme.colors.green.primary};
        border-color: ${props.theme.colors.green.primary};
        background: ${props.theme.colors.white};
        svg path {
          stroke: ${props.theme.colors.green.primary};
        }
      }
    `}

  ${props =>
    props.red &&
    css`
      color: ${props.theme.colors.white};
      border-color: ${props.theme.colors.red.base};
      background: ${props.theme.colors.red.base};
      svg path {
        stroke: ${props.theme.colors.white};
      }

      &:hover {
        color: ${props.theme.colors.white};
        border-color: ${props.theme.colors.red.light};
        background: ${props.theme.colors.red.light};
        svg path {
          stroke: ${props.theme.colors.white};
        }
      }

      &:active {
        color: ${props.theme.colors.red.base};
        border-color: ${props.theme.colors.red.base};
        background: ${props.theme.colors.white};
        svg path {
          stroke: ${props.theme.colors.red.base};
        }
      }
    `}

  ${props =>
    props.disabled &&
    css`
      cursor: default;
      color: ${props.theme.colors.gray.medium};
      border-color: ${props.theme.colors.gray.medium};
      pointer-events: none;
      svg path {
        stroke: ${props.theme.colors.gray.medium};
      }
    `}

  ${layout}
  ${space}
`

ButtonV2.propTypes = {
  large: PropTypes.bool,
  white: PropTypes.bool,
  green: PropTypes.bool,
  red: PropTypes.bool,
  disabled: PropTypes.bool
}

ButtonV2.defaultProps = {
  large: false,
  white: false,
  green: false,
  red: false,
  disabled: false
}

export default ButtonV2
