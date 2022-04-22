import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { validateAddressString } from '@glif/filecoin-address'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

/**
 * AddressInput
 */
export const AddressInput = ({
  value,
  onFocus,
  onBlur,
  setIsValid,
  ...baseProps
}: AddressInputProps) => {
  const [error, setError] = useState<string>('')
  const [hasFocus, setHasFocus] = useState<boolean>(false)

  const onFocusBase = () => {
    setHasFocus(true)
    onFocus()
  }

  const onBlurBase = () => {
    setHasFocus(false)
    onBlur()
  }

  useEffect(() => {
    const isValid = validateAddressString(value)
    setError(isValid ? '' : 'Needs to be a valid address')
    setIsValid(isValid)
  }, [value, setIsValid])

  return (
    <BaseInput
      error={hasFocus ? '' : error}
      type='text'
      value={value}
      onFocus={onFocusBase}
      onBlur={onBlurBase}
      {...baseProps}
    />
  )
}

/**
 * We strip certain properties from the standard
 * base input props because we want to override them:
 *
 * error: set by address input validation
 * type: always "text" for address input
 *
 * We add "setIsValid"
 */

export type AddressInputProps = {
  setIsValid?: (isValid: boolean) => void
} & Omit<BaseInputProps, 'error' | 'type'>

const { error, type, ...addressProps } = BaseInputPropTypes

AddressInput.propTypes = {
  setIsValid: PropTypes.func,
  ...addressProps
}

/**
 * Provide defaults for props that are used in this input
 */

 AddressInput.defaultProps = {
  value: '',
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {}
}
