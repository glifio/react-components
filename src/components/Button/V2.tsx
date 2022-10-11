import PropTypes from 'prop-types'
import { MouseEvent, ReactNode, useCallback } from 'react'
import {
  SmartLink,
  SmartLinkProps,
  SmartLinkPropTypes
} from '../SmartLink'

/*
 * ButtonV2
 */

export const ButtonV2 = ({
  children,
  onClick,
  disabled,
  stopPropagation,
  ...classNameProps
}: ButtonProps) => {

  const onClickProxy = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      stopPropagation && e.stopPropagation()
      onClick(e)
    },
    [stopPropagation, onClick]
  )

  return (
    <button
      className={getClassName(classNameProps)}
      disabled={disabled}
      onClick={onClickProxy}
    >
      {children}
    </button>
  )
}

interface ButtonClassNameProps {
  disabled?: boolean
  large?: boolean
  white?: boolean
  gray?: boolean
  red?: boolean
  green?: boolean
}

type ButtonProps = {
  type?: string
  children: ReactNode
  stopPropagation?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
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
  green: PropTypes.bool,
  type: PropTypes.string,
  stopPropagation: PropTypes.bool
}

const ButtonDefaultProps = {
  stopPropagation: true,
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
  const classes = Object.keys(props).filter(name => props[name] && allowed.includes(name))
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

ButtonV2Link.defaultProps = {
  ...ButtonDefaultProps,
  ...SmartLink.defaultProps
}
