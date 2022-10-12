import PropTypes from 'prop-types'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'
import {
  ButtonClassNameProps,
  ButtonClassNamePropTypes,
  getButtonClassName
} from '../ButtonV2'

/**
 * ButtonInput
 */

export const ButtonInput = ({
  submit,
  large,
  white,
  gray,
  red,
  green,
  ...baseInputProps
}: ButtonInputProps) => (
  <BaseInput
    type={submit ? 'submit' : 'button'}
    className={getButtonClassName({ large, white, gray, red, green })}
    {...baseInputProps}
  />
)

/**
 * Allow the full set of base input props, except:
 *
 * type: always "button" or "submit" for button input
 * className: generated from ButtonClassNameProps
 *
 * We add "submit" and all the button class name props except
 * "disabled", which is already present in the base input props
 */

export type ButtonInputProps = {
  submit?: boolean
} & Omit<ButtonClassNameProps, 'disabled'> &
  Omit<BaseInputProps, 'type' | 'className'>

const { disabled, ...buttonClassNameProps } = ButtonClassNamePropTypes
const { type, className, ...buttonInputProps } = BaseInputPropTypes

ButtonInput.propTypes = {
  submit: PropTypes.bool,
  ...buttonClassNameProps,
  ...buttonInputProps
}
