import PropTypes from 'prop-types'
import { useEffect, useState, useMemo } from 'react'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

/**
 * PrivateKeyInput
 */
export const PrivateKeyInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  setIsValid,
  importError,
  ...baseProps
}: PrivateKeyInputProps) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(() => {
    if (!value) {
      return 'Cannot be empty'
    }
    try {
      const buffer = Buffer.from(value, 'base64')
      const result = buffer.toString('base64')
      if (result !== value) throw new Error()
    } catch (e) {
      return 'Needs to be valid Base64'
    }

    if (importError) return 'Error importing private key'
    return ''
  }, [value, importError])

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
      autoComplete='off'
      placeholder='Enter your private key'
      value={value}
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
 * error: set by private key input validation
 * type: always "text" for private key input
 * autoComplete: always "off" for private key
 * placeholder: always "Enter your private key"
 *
 * We add "setIsValid" and "importError"
 */

export type PrivateKeyInputProps = {
  setIsValid?: (isValid: boolean) => void
  importError?: string
} & Omit<BaseInputProps, 'error' | 'type' | 'autoComplete' | 'placeholder'>

const { error, type, autoComplete, placeholder, ...addressProps } =
  BaseInputPropTypes

PrivateKeyInput.propTypes = {
  setIsValid: PropTypes.func,
  importError: PropTypes.string,
  ...addressProps
}

/**
 * Provide defaults for props that are used in this input
 */

PrivateKeyInput.defaultProps = {
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {},
  importError: ''
}