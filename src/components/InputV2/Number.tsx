import PropTypes from 'prop-types'
import { useState } from 'react'
import { BaseInput, BaseInputProps } from './Base'

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
  onBlur,
  setHasError,
  ...baseProps
}: NumberInputProps) => {
  const [error, setError] = useState<string>('')
  const onChangeText = (newTextValue: string) => {
    setError('')
    setHasError(false)
    onChange(newTextValue ? Number(newTextValue) : NaN)
  }
  const onBlurText = (newTextValue: string) => {
    const number = newTextValue ? Number(newTextValue) : NaN
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
      error={error}
      type='number'
      value={isNaN(value) ? '' : value.toString()}
      onChange={onChangeText}
      onBlur={onBlurText}
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
 * onBlur: needs to take "number" type argument
 */

export type NumberInputProps = {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  onBlur: (value: number) => void
  setHasError: (hasError: boolean) => void
} & Omit<BaseInputProps, 'error' | 'type' | 'value' | 'onChange' | 'onBlur'>

// "onChange" and "onBlur" remain of type "PropTypes.func"
const { error, type, value, ...numberProps } = BaseInput.propTypes

NumberInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  setHasError: PropTypes.func,
  ...numberProps
}

NumberInput.defaultProps = {
  min: -Infinity,
  max: Infinity,
  value: NaN,
  onChange: () => {},
  onBlur: () => {},
  setHasError: () => {}
}
