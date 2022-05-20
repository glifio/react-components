import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

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
