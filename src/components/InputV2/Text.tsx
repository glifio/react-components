import { BaseInput, BaseInputProps } from './Base'

/**
 * The following components all allow the full set of base input
 * props except "type", which is passed manually for each component
 */
type TextInputProps = Omit<BaseInputProps, 'type'>
const { type, ...textInputPropTypes } = BaseInput.propTypes

/**
 * TextInput
 */
export const TextInput = (props: TextInputProps) => (
  <BaseInput type='text' {...props} />
)
TextInput.propTypes = textInputPropTypes

/**
 * EmailInput
 */
export const EmailInput = (props: TextInputProps) => (
  <BaseInput type='email' {...props} />
)
EmailInput.propTypes = textInputPropTypes

/**
 * PasswordInput
 */
export const PasswordInput = (props: TextInputProps) => (
  <BaseInput type='password' {...props} />
)
PasswordInput.propTypes = textInputPropTypes

/**
 * SearchInput
 */
export const SearchInput = (props: TextInputProps) => (
  <BaseInput type='search' {...props} />
)
SearchInput.propTypes = textInputPropTypes
