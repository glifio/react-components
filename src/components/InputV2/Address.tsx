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
  onChange,
  onFocus,
  onBlur,
  setIsValid,
  truncate,
  msig,
  ...baseProps
}: AddressInputProps) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(() => {
    if (!validateAddressString(value)) return 'Needs to be a valid address'
    if (msig && value[1] !== '0' && value[1] !== '2')
      return 'Second character must be 0 or 2'
    return ''
  }, [value, msig])

  // Truncate address if valid
  const truncated = useMemo<string>(
    () => (error ? value : truncateAddress(value)),
    [error, value]
  )

  // Communicate validity to parent component
  useEffect(() => setIsValid(!error), [setIsValid, error])

  const onChangeBase = (newValue: string) => {
    setHasChanged(true)
    onChange(newValue.trim())
  }

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
      error={!hasFocus && hasChanged ? error : ''}
      type='text'
      placeholder={msig ? 'f2...' : 'f1...'}
      value={hasFocus || !truncate ? value : truncated}
      onChange={onChangeBase}
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
 * We add "setIsValid", "truncate" and "msig"
 */

export type AddressInputProps = {
  setIsValid?: (isValid: boolean) => void
  truncate?: boolean
  msig?: boolean
} & Omit<BaseInputProps, 'error' | 'type' | 'placeholder'>

const { error, type, placeholder, ...addressProps } = BaseInputPropTypes

AddressInput.propTypes = {
  setIsValid: PropTypes.func,
  truncate: PropTypes.bool,
  msig: PropTypes.bool,
  ...addressProps
}

/**
 * Provide defaults for props that are used in this input
 */

AddressInput.defaultProps = {
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {},
  truncate: true,
  msig: false
}
