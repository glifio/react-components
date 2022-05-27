import PropTypes from 'prop-types'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

/**
 * Button
 */

const buttonClassNames = ['disabled', 'large', 'white', 'gray', 'red', 'green']

interface ButtonClassNameProps {
  disabled?: boolean
  large?: boolean
  white?: boolean
  gray?: boolean
  red?: boolean
  green?: boolean
}

const ButtonClassNamePropTypes = {
  disabled: PropTypes.bool,
  large: PropTypes.bool,
  white: PropTypes.bool,
  gray: PropTypes.bool,
  red: PropTypes.bool,
  green: PropTypes.bool
}

const getButtonClassName = (props: ButtonClassNameProps): string => {
  return Object.keys(props)
    .filter(name => props[name] && buttonClassNames.includes(name))
    .join(' ')
}

/**
 * ButtonInput
 */

export const ButtonInput = ({
  large,
  white,
  gray,
  red,
  green,
  ...baseInputProps
}: ButtonInputProps) => (
  <BaseInput
    type='button'
    className={getButtonClassName({ large, white, gray, red, green })}
    {...baseInputProps}
  />
)

/**
 * Allow the full set of base input props, except:
 *
 * type: always "button" for button input
 * className: generated from ButtonClassNameProps
 *
 * We add the button class name props except "disabled",
 * which is already present in the base input props
 */

export type ButtonInputProps = Omit<ButtonClassNameProps, 'disabled'> &
  Omit<BaseInputProps, 'type' | 'className'>

const { disabled, ...buttonClassNameProps } = ButtonClassNamePropTypes
const { type, className, ...buttonInputProps } = BaseInputPropTypes

ButtonInput.propTypes = {
  ...buttonClassNameProps,
  ...buttonInputProps
}
