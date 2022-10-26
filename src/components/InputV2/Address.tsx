import PropTypes from 'prop-types'
import { useEffect, useState, useMemo } from 'react'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'
import { isAddress } from '../../utils/isAddress'
import { truncateString } from '../../utils/truncateString'

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
  actor,
  ...baseProps
}: AddressInputProps) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(() => {
    if (!isAddress(value)) return 'Needs to be a valid address'
    if (actor && value[1] !== '0' && value[1] !== '2')
      return 'Second character must be 0 or 2'
    return ''
  }, [value, actor])

  // Truncate address if valid
  const truncated = useMemo<string>(
    () => (error ? value : truncateString(value)),
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
      placeholder={actor ? 'f2...' : 'f1...'}
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
 * We add "setIsValid", "truncate" and "actor"
 */

export type AddressInputProps = {
  setIsValid?: (isValid: boolean) => void
  truncate?: boolean
  actor?: boolean
} & Omit<BaseInputProps, 'error' | 'type' | 'placeholder'>

const { error, type, placeholder, ...addressProps } = BaseInputPropTypes

AddressInput.propTypes = {
  setIsValid: PropTypes.func,
  truncate: PropTypes.bool,
  actor: PropTypes.bool,
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
  actor: false
}
