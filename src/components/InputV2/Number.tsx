import PropTypes from 'prop-types'
import { useState } from 'react'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

/**
 * NumberInput
 *
 * When the number input field is empty, value will be NaN. This is so we can
 * differentiate between 0 and empty input while value remains of type "number".
 */
export const NumberInput = ({
  min,
  max,
  value,
  onChange,
  onFocus,
  onBlur,
  setIsValid,
  ...baseProps
}: NumberInputProps) => {
  const [error, setError] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)

  const onChangeBase = (newValue: string) => {
    setError('')
    setHasError(false)
    onChange(newValue ? Number(newValue) : NaN)
  }

  const onFocusBase = (newValue: string) => {
    
  }

  const onBlurBase = (newValue: string) => {
    const number = newValue ? Number(newValue) : NaN
    if (number < min) {
      setError(`Cannot be less than ${min}`)
      setHasError(true)
    }
    if (number > max) {
      setError(`Cannot be more than ${max}`)
      setHasError(true)
    }
    if (isNaN(number)) {
      setError(`Cannot be empty`)
      setHasError(true)
    }
    onBlur(number)
  }

  return (
    <BaseInput
      error={showError ? error : ''}
      type='number'
      value={isNaN(value) ? '' : value.toString()}
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
 * error: set by number input validation
 * type: always "number" for number input
 * value: needs to be of type "number" / "PropTypes.number"
 * onChange: needs to take "number" type argument
 * onFocus: needs to take "number" type argument
 * onBlur: needs to take "number" type argument
 */

export type NumberInputProps = {
  min?: number
  max?: number
  value?: number
  onChange?: (value: number) => void
  onFocus?: (value: number) => void
  onBlur?: (value: number) => void
  setIsValid?: (hasError: boolean) => void
} & Omit<
  BaseInputProps,
  'error' | 'type' | 'value' | 'onChange' | 'onFocus' | 'onBlur'
>

// "onChange", "onFocus" and "onBlur" remain of type "PropTypes.func"
const { error, type, value, ...numberProps } = BaseInputPropTypes

NumberInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  setIsValid: PropTypes.func,
  ...numberProps
}

NumberInput.defaultProps = {
  min: -Infinity,
  max: Infinity,
  value: NaN,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {}
}
