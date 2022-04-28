import PropTypes from 'prop-types'
import { useEffect, useState, useMemo } from 'react'
import { validateAddressString } from '@glif/filecoin-address'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'
import truncateAddress from '../../utils/truncateAddress'

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
  const [hasFocus, setHasFocus] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(
    () => (validateAddressString(value) ? '' : 'Needs to be a valid address'),
    [value]
  )

  // Truncate address if valid
  const truncated = useMemo<string>(
    () => (error ? value : truncateAddress(value)),
    [error, value]
  )

  // Communicate validity to parent component
  useEffect(() => setIsValid(!error), [setIsValid, error])

  const onFocusBase = () => {
    setHasFocus(true)
    onFocus()
  }

  const onBlurBase = () => {
    setHasFocus(false)
    onBlur()
  }

  return (
    <BaseInput
      error={hasFocus ? '' : error}
      type='text'
      placeholder='f1...'
      value={hasFocus ? value : truncated}
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
 * placeholder: always "f1..." for address input
 *
 * We add "setIsValid"
 */

export type AddressInputProps = {
  setIsValid?: (isValid: boolean) => void
} & Omit<BaseInputProps, 'error' | 'type' | 'placeholder'>

const { error, type, placeholder, ...addressProps } = BaseInputPropTypes

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
