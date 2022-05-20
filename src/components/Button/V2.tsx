import PropTypes from 'prop-types'
import { ReactNode } from 'react'
import {
  SmartLink,
  SmartLinkProps,
  SmartLinkPropTypes
} from '../Link/SmartLink'

/*
 * ButtonV2
 */

export const ButtonV2 = ({
  children,
  onClick,
  disabled,
  ...classNameProps
}: ButtonProps) => (
  <button
    className={getClassName(classNameProps)}
    disabled={disabled}
    onClick={() => onClick()}
  >
    {children}
  </button>
)

interface ButtonClassNameProps {
  disabled?: boolean
  large?: boolean
  white?: boolean
  gray?: boolean
  red?: boolean
  green?: boolean
}

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
} & ButtonClassNameProps

const ButtonPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  large: PropTypes.bool,
  white: PropTypes.bool,
  gray: PropTypes.bool,
  red: PropTypes.bool,
  green: PropTypes.bool
}

const ButtonDefaultProps = {
  disabled: false,
  large: false,
  white: false,
  gray: false,
  red: false,
  green: false,
  onClick: () => {}
}

ButtonV2.propTypes = ButtonPropTypes
ButtonV2.defaultProps = ButtonDefaultProps

const getClassName = (props: ButtonClassNameProps): string => {
  const allowed = ['disabled', 'large', 'white', 'gray', 'red', 'green']
  const classes = Object.keys(props).filter(name => allowed.includes(name))
  return classes.join(' ')
}

/*
 * ButtonV2Link
 */

export const ButtonV2Link = ({
  children,
  href,
  download,
  onClick,
  ...classNameProps
}: ButtonLinkProps) => (
  <SmartLink
    className={getClassName(classNameProps)}
    href={href}
    download={download}
    onClick={onClick}
  >
    {children}
  </SmartLink>
)

type ButtonLinkProps = ButtonProps & SmartLinkProps

ButtonV2Link.propTypes = {
  ...ButtonPropTypes,
  ...SmartLinkPropTypes
}

ButtonV2Link.defaultProps = ButtonDefaultProps
