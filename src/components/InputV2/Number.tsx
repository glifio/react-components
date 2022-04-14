import PropTypes from 'prop-types'
import { useState } from 'react'
import { TextInput, TextInputProps } from './Base'

export const NumberInput = ({
  min,
  max,
  value,
  onChange,
  onBlur,
  setHasError,
  ...textProps
}: NumberInputProps) => {
  const [error, setError] = useState<string>('')
  const onChangeText = (newTextValue: string) => {
    setError('')
    setHasError(false)
    onChange(Number(newTextValue))
  }
  const onBlurText = (newTextValue: string) => {
    const number = Number(newTextValue)
    if (number < min) {
      setError(`Has to be at least ${min}`)
      setHasError(true)
    }
    if (number > max) {
      setError(`Cannot be more than ${max}`)
      setHasError(true)
    }
    onBlur(number)
  }

  return (
    <TextInput
      error={error}
      type='number'
      value={isNaN(value) ? '' : value.toString()}
      onChange={onChangeText}
      onBlur={onBlurText}
      {...textProps}
    />
  )
}

/**
 * We strip certain properties from the standard
 * text input props because we want to override them:
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
} & Omit<TextInputProps, 'error' | 'type' | 'value' | 'onChange' | 'onBlur'>

// "onChange" and "onBlur" remain of type "PropTypes.func"
// eslint-disable-next-line
const { error, type, value, ...numberProps } = TextInput.propTypes

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
