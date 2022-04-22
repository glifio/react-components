import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

/**
 * ParamsInput
 */
export const ParamsInput = ({
  value,
  onFocus,
  onBlur,
  setIsValid,
  required,
  ...baseProps
}: ParamsInputProps) => {
  const [error, setError] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)

  const onFocusBase = () => {
    setShowError(false)
    onFocus()
  }

  const onBlurBase = () => {
    setShowError(true)
    onBlur()
  }

  useEffect(() => {
    if (required && !value) {
      setError('Cannot be empty')
      setIsValid(false)
      return
    }
    try {
      const buffer = Buffer.from(value, 'base64')
      const result = buffer.toString('base64')
      if (result !== value) throw new Error()
    } catch (e) {
      setError('Needs to be valid Base64')
      setIsValid(false)
      return
    }
    setError('')
    setIsValid(true)
  }, [value, setIsValid, required])

  return (
    <BaseInput
      error={showError ? error : ''}
      type='text'
      placeholder={`${required ? '' : 'Optional '}Base64 params`}
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
 * error: set by params input validation
 * type: always "text" for params input
 * placeholder: set by params input
 *
 * We add "setIsValid" and "required"
 */

export type ParamsInputProps = {
  setIsValid?: (isValid: boolean) => void
  required?: boolean
} & Omit<BaseInputProps, 'error' | 'type' | 'placeholder'>

const { error, type, placeholder, ...paramsProps } = BaseInputPropTypes

ParamsInput.propTypes = {
  setIsValid: PropTypes.func,
  required: PropTypes.bool,
  ...paramsProps
}

/**
 * Provide defaults for props that are used in this input
 */

ParamsInput.defaultProps = {
  value: '',
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {},
  required: false
}
