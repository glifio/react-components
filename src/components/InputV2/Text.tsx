import {
  RequireableInput,
  RequireableInputProps,
  RequireableInputPropTypes
} from './Requirable'

/**
 * The following components all allow the full set of base input
 * props except "type", which is passed manually for each component
 */
export type TextInputProps = Omit<RequireableInputProps, 'type'>
const { type, ...textInputPropTypes } = RequireableInputPropTypes

/**
 * TextInput
 */
export const TextInput = (props: TextInputProps) => (
  <RequireableInput type='text' {...props} />
)
TextInput.propTypes = textInputPropTypes

/**
 * EmailInput
 */
export const EmailInput = (props: TextInputProps) => (
  <RequireableInput type='email' {...props} />
)
EmailInput.propTypes = textInputPropTypes

/**
 * PasswordInput
 */
export const PasswordInput = (props: TextInputProps) => (
  <RequireableInput type='password' {...props} />
)
PasswordInput.propTypes = textInputPropTypes

/**
 * SearchInput
 */
export const SearchInput = (props: TextInputProps) => (
  <RequireableInput type='search' {...props} />
)
SearchInput.propTypes = textInputPropTypes
