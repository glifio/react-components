import PropTypes from 'prop-types'
import { useEffect, useState, useMemo } from 'react'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

/**
 * RequireableInput
 */
export const RequireableInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  setIsValid,
  required,
  ...baseProps
}: RequireableInputProps) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(
    () => (required && !value ? 'Cannot be empty' : ''),
    [value, required]
  )

  // Communicate validity to parent component
  useEffect(() => setIsValid(!error), [setIsValid, error])

  const onChangeBase = (newValue: string) => {
    setHasChanged(true)
    onChange(newValue)
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
 * error: set by requireable input validation
 *
 * We add "setIsValid" and "required"
 */

export type RequireableInputProps = {
  setIsValid?: (isValid: boolean) => void
  required?: boolean
} & Omit<BaseInputProps, 'error'>

const { error, ...requireableProps } = BaseInputPropTypes

export const RequireableInputPropTypes = {
  setIsValid: PropTypes.func,
  required: PropTypes.bool,
  ...requireableProps
}

RequireableInput.propTypes = RequireableInputPropTypes

/**
 * Provide defaults for props that are used in this input
 */

RequireableInput.defaultProps = {
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {},
  required: false
}
