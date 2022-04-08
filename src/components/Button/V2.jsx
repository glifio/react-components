import styled, { css } from 'styled-components'
import { layout, space } from 'styled-system'
import PropTypes from 'prop-types'

import { SmartLink } from '../Link/SmartLink'

const buttonStyle = css`
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
  
  color: var(--black);
  border-color: var(--black);
  background: transparent;
  text-align: center;

  svg path {
    stroke: var(--black);
  }

  &:hover {
    color: var(--purple-medium);
    border-color: var(--purple-medium);
    svg path {
      stroke: var(--purple-medium);
    }
  }

  &:active {
    color: var(--white);
    background: var(--purple-medium);
    svg path {
      stroke: var(--white);
    }
  }

  ${props =>
    css`
      ${props.large &&
      css`
        font-size: 1.25em;
      `}

      ${props.white &&
      css`
        color: var(--white);
        border-color: var(--white);
        svg path {
          stroke: var(--white);
        }
      `}

      ${props.gray &&
      css`
        color: var(--gray-dark);
        border-color: var(--gray-dark);
        svg path {
          stroke: var(--gray-dark);
        }
      `}

      ${props.green &&
      css`
        color: var(--white);
        border-color: ${props.theme.colors.green.primary};
        background: ${props.theme.colors.green.primary};
        svg path {
          stroke: var(--white);
        }

        &:hover {
          color: var(--white);
          border-color: ${props.theme.colors.green.muted};
          background: ${props.theme.colors.green.muted};
          svg path {
            stroke: var(--white);
          }
        }

        &:active {
          color: ${props.theme.colors.green.primary};
          border-color: ${props.theme.colors.green.primary};
          background: var(--white);
          svg path {
            stroke: ${props.theme.colors.green.primary};
          }
        }
      `}

      ${props.red &&
      css`
        color: var(--white);
        border-color: ${props.theme.colors.red.base};
        background: ${props.theme.colors.red.base};
        svg path {
          stroke: var(--white);
        }

        &:hover {
          color: var(--white);
          border-color: ${props.theme.colors.red.light};
          background: ${props.theme.colors.red.light};
          svg path {
            stroke: var(--white);
          }
        }

        &:active {
          color: ${props.theme.colors.red.base};
          border-color: ${props.theme.colors.red.base};
          background: var(--white);
          svg path {
            stroke: ${props.theme.colors.red.base};
          }
        }
      `}

      ${props.disabled &&
      css`
        cursor: default;
        color: ${props.theme.colors.gray.medium};
        border-color: ${props.theme.colors.gray.medium};
        background: transparent;
        pointer-events: none;
        svg path {
          stroke: ${props.theme.colors.gray.medium};
        }
      `}
    `}

  ${layout}
  ${space}
`

const buttonPropTypes = {
  large: PropTypes.bool,
  white: PropTypes.bool,
  green: PropTypes.bool,
  red: PropTypes.bool,
  gray: PropTypes.bool,
  disabled: PropTypes.bool
}

const buttonDefaultProps = {
  large: false,
  white: false,
  green: false,
  red: false,
  gray: false,
  disabled: false
}

/*
 * ButtonV2
 */
export const ButtonV2 = styled.button`
  ${buttonStyle}
`
ButtonV2.propTypes = buttonPropTypes
ButtonV2.defaultProps = buttonDefaultProps

/*
 * ButtonV2Link
 */
export const ButtonV2Link = styled(SmartLink)`
  text-decoration: none;
  ${buttonStyle}
`
ButtonV2Link.propTypes = {
  ...buttonPropTypes,
  ...SmartLink.propTypes
}
ButtonV2Link.defaultProps = {
  ...buttonDefaultProps,
  ...SmartLink.defaultProps
}
