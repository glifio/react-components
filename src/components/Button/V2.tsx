import { MouseEvent, ReactNode, useCallback } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { SmartLink, SmartLinkPropTypes } from '../SmartLink'
import { Colors } from '../theme'

const buttonStyle = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  line-height: 1.3;
  cursor: pointer;
  gap: 0.75rem;
  padding: 0.5em 0.75em;
  color: ${Colors.BLACK};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  border-color: ${Colors.BLACK};
  background: transparent;

  svg path {
    stroke: ${Colors.BLACK};
  }

  &:hover {
    color: ${Colors.PURPLE_MEDIUM};
    border-color: ${Colors.PURPLE_MEDIUM};
    svg path {
      stroke: ${Colors.PURPLE_MEDIUM};
    }
  }

  &:active {
    color: ${Colors.WHITE} !important;
    border-color: ${Colors.PURPLE_MEDIUM} !important;
    background: ${Colors.PURPLE_MEDIUM} !important;
    svg path {
      stroke: ${Colors.WHITE} !important;
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
        color: ${Colors.WHITE};
        border-color: ${Colors.WHITE};
        svg path {
          stroke: ${Colors.WHITE};
        }
      `}

      ${props.gray &&
      css`
        color: ${Colors.GRAY_DARK};
        border-color: ${Colors.GRAY_DARK};
        svg path {
          stroke: ${Colors.GRAY_DARK};
        }
      `}

      ${props.green &&
      css`
        color: ${Colors.WHITE};
        border-color: ${Colors.GREEN_MEDIUM};
        background: ${Colors.GREEN_MEDIUM};
        svg path {
          stroke: ${Colors.WHITE};
        }

        &:hover {
          color: ${Colors.GREEN_MEDIUM};
          border-color: ${Colors.GREEN_MEDIUM};
          background: ${Colors.WHITE};
          svg path {
            stroke: ${Colors.GREEN_MEDIUM};
          }
        }
      `}

      ${props.red &&
      css`
        color: ${Colors.WHITE};
        border-color: ${Colors.RED_MEDIUM};
        background: ${Colors.RED_MEDIUM};
        svg path {
          stroke: ${Colors.WHITE};
        }

        &:hover {
          color: ${Colors.RED_MEDIUM};
          border-color: ${Colors.RED_MEDIUM};
          background: ${Colors.WHITE};
          svg path {
            stroke: ${Colors.RED_MEDIUM};
          }
        }
      `}

      ${props.disabled &&
      css`
        pointer-events: none;
        color: ${Colors.GRAY_MEDIUM};
        border-color: ${Colors.GRAY_MEDIUM};
        background: transparent;
        svg path {
          stroke: ${Colors.GRAY_MEDIUM};
        }
      `}
    `}
`

interface ButtonV2Props {
  children: ReactNode
  large?: boolean
  white?: boolean
  green?: boolean
  red?: boolean
  gray?: boolean
  type?: string
  disabled?: boolean
  stopPropagation?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

const buttonPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  large: PropTypes.bool,
  white: PropTypes.bool,
  green: PropTypes.bool,
  red: PropTypes.bool,
  gray: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  onClick: PropTypes.func
}

const buttonDefaultProps = {
  stopPropagation: true,
  onClick: () => {}
}

/*
 * ButtonV2
 */
const ButtonV2El = styled.button`
  ${buttonStyle}
`

export const ButtonV2 = ({
  children,
  stopPropagation,
  onClick,
  ...props
}: ButtonV2Props) => {
  const onClickProxy = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      stopPropagation && e.stopPropagation()
      onClick(e)
    },
    [stopPropagation, onClick]
  )

  return (
    <ButtonV2El onClick={onClickProxy} {...props}>
      {children}
    </ButtonV2El>
  )
}

ButtonV2.propTypes = buttonPropTypes
ButtonV2.defaultProps = buttonDefaultProps

/*
 * ButtonV2Link
 */
export const ButtonV2Link = styled(SmartLink)`
  ${buttonStyle}
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`
ButtonV2Link.propTypes = {
  ...buttonPropTypes,
  ...SmartLinkPropTypes
}
ButtonV2Link.defaultProps = {
  ...buttonDefaultProps,
  ...SmartLink.defaultProps
}
