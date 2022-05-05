import PropTypes from 'prop-types'
import { useEffect, useState, useMemo } from 'react'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

/**
 * RequireableInput
 */
export const RequireableInput = ({
  value,
  onFocus,
  onBlur,
  setIsValid,
  required,
  ...baseProps
}: RequireableInputProps) => {
  const [showError, setShowError] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(
    () => (required && !value ? 'Cannot be empty' : ''),
    [value, required]
  )

  // Communicate validity to parent component
  useEffect(() => setIsValid(!error), [setIsValid, error])

  const onFocusBase = () => {
    setShowError(false)
    onFocus()
  }

  const onBlurBase = () => {
    setShowError(true)
    onBlur()
  }

  return (
    <BaseInput
      error={showError ? error : ''}
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
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {},
  required: false
}
