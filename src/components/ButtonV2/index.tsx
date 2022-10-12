import PropTypes from 'prop-types'
import { MouseEvent, ReactNode, useCallback } from 'react'
import { SmartLink, SmartLinkProps, SmartLinkPropTypes } from '../SmartLink'

// Supported button class names
export const buttonClassNames = [
  'disabled',
  'large',
  'white',
  'gray',
  'red',
  'green'
] as const

// Button class name types
export type ButtonClassName = typeof buttonClassNames[number]
export type ButtonClassNameProps = Partial<Record<ButtonClassName, boolean>>

// Button class name PropTypes
export const ButtonClassNamePropTypes: Record<
  ButtonClassName,
  PropTypes.Requireable<boolean>
> = {
  disabled: PropTypes.bool,
  large: PropTypes.bool,
  white: PropTypes.bool,
  gray: PropTypes.bool,
  red: PropTypes.bool,
  green: PropTypes.bool
}

// Get the class name string from button props
export const getButtonClassName = (props: ButtonClassNameProps): string => {
  return buttonClassNames.filter(name => !!props[name]).join(' ')
}

/*
 * ButtonV2
 */

export const ButtonV2 = ({
  children,
  type,
  stopPropagation,
  onClick,
  disabled,
  ...classNameProps
}: ButtonV2Props) => {
  const onClickProxy = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      stopPropagation && e.stopPropagation()
      onClick(e)
    },
    [stopPropagation, onClick]
  )

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClickProxy}
      className={getButtonClassName(classNameProps)}
    >
      {children}
    </button>
  )
}

type ButtonV2Props = {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  stopPropagation?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
} & ButtonClassNameProps

const ButtonV2PropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  type: PropTypes.string,
  stopPropagation: PropTypes.bool,
  onClick: PropTypes.func,
  ...ButtonClassNamePropTypes
}

const ButtonV2DefaultProps = {
  stopPropagation: true,
  onClick: () => {}
}

ButtonV2.propTypes = ButtonV2PropTypes
ButtonV2.defaultProps = ButtonV2DefaultProps

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
    className={getButtonClassName(classNameProps)}
    href={href}
    download={download}
    onClick={onClick}
  >
    {children}
  </SmartLink>
)

type ButtonLinkProps = ButtonV2Props & SmartLinkProps

ButtonV2Link.propTypes = {
  ...ButtonV2PropTypes,
  ...SmartLinkPropTypes
}

ButtonV2Link.defaultProps = {
  ...ButtonV2DefaultProps,
  ...SmartLink.defaultProps
}
