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
  return Object.keys(props).filter(name => props[name] && buttonClassNames.includes(name)).join(' ')
}

/**
 * ButtonInput
 */

export const ButtonInput = (props: ButtonInputProps) => (
  <BaseInput type='button' {...props} />
)

/**
 * Allow the full set of base input props, except
 * "type", which is always "button" for button input
 */

export type ButtonInputProps = Omit<BaseInputProps, 'type'>
const { type, ...buttonInputPropTypes } = BaseInputPropTypes

ButtonInput.propTypes = buttonInputPropTypes
