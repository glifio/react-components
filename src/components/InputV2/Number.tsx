import PropTypes from 'prop-types'
import { useState } from 'react'
import { TextInput, TextInputProps } from './Text'

export const NumberInput = ({
  min,
  max,
  value,
  onChange,
  onBlur,
  ...textProps
}: NumberProps) => {
  const [error, setError] = useState<string>('')
  const [textValue, setTextValue] = useState<string>(isNaN(value) ? '' : value.toString())
  const onChangeText = (newTextValue: string) => {
    const number = Number(newTextValue)
    setTextValue(newTextValue)
    onChange(number)
  }
  const onBlurText = (newTextValue: string) => {
    const number = Number(newTextValue)
    onBlur(number)
  }

  return (
    <TextInput
      type='number'
      value={textValue}
      onChange={onChangeText}
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

type NumberProps = {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  onBlur: (value: number) => void
} & Omit<
  TextInputProps,
  'error' | 'type' | 'value' | 'onChange' | 'onBlur'
>

// "onChange" and "onBlur" remain of type "PropTypes.func"
const { error, type, value, ...numberProps } = TextInput.propTypes

NumberInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  ...numberProps
}

NumberInput.defaultProps = {
  min: -Infinity,
  max: Infinity,
  value: NaN,
  onChange: () => {},
  onBlur: () => {}
}
