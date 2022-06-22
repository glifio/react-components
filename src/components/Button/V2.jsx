import styled, { css } from 'styled-components'
import { layout, space } from 'styled-system'
import PropTypes from 'prop-types'

import { SmartLink, SmartLinkPropTypes } from '../Link/SmartLink'

const buttonStyle = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  gap: 0.75rem;
  padding: 0.5em 0.75em;
  color: var(--black);
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  border-color: var(--black);
  background: transparent;

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
    color: var(--white) !important;
    border-color: var(--purple-medium) !important;
    background: var(--purple-medium) !important;
    svg path {
      stroke: var(--white) !important;
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
        border-color: var(--green-medium);
        background: var(--green-medium);
        svg path {
          stroke: var(--white);
        }

        &:hover {
          color: var(--green-medium);
          border-color: var(--green-medium);
          background: var(--white);
          svg path {
            stroke: var(--green-medium);
          }
        }
      `}

      ${props.red &&
      css`
        color: var(--white);
        border-color: var(--red-medium);
        background: var(--red-medium);
        svg path {
          stroke: var(--white);
        }

        &:hover {
          color: var(--red-medium);
          border-color: var(--red-medium);
          background: var(--white);
          svg path {
            stroke: var(--red-medium);
          }
        }
      `}

      ${props.disabled &&
      css`
        pointer-events: none;
        color: var(--gray-medium);
        border-color: var(--gray-medium);
        background: transparent;
        svg path {
          stroke: var(--gray-medium);
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
  ...SmartLinkPropTypes
}
ButtonV2Link.defaultProps = buttonDefaultProps
