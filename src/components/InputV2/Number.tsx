import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
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
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const onChangeBase = (newValue: string) => {
    onChange(newValue ? Number(newValue) : NaN)
  }

  const onFocusBase = () => {
    setHasFocus(true)
    onFocus()
  }

  const onBlurBase = () => {
    setHasFocus(false)
    onBlur()
  }

  useEffect(() => {
    if (isNaN(value)) {
      setError(`Cannot be empty`)
      setIsValid(false)
      return
    }
    if (value < min) {
      setError(`Cannot be less than ${min}`)
      setIsValid(false)
      return
    }
    if (value > max) {
      setError(`Cannot be more than ${max}`)
      setIsValid(false)
      return
    }
    setError('')
    setIsValid(true)
  }, [min, max, value, setIsValid])

  return (
    <BaseInput
      error={hasFocus ? '' : error}
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
 *
 * We add "min", "max" and "setIsValid"
 */

export type NumberInputProps = {
  min?: number
  max?: number
  value?: number
  onChange?: (value: number) => void
  setIsValid?: (isValid: boolean) => void
} & Omit<BaseInputProps, 'error' | 'type' | 'value' | 'onChange'>

// "onChange" remains "PropTypes.func", so doesn't need an override
const { error, type, value, ...numberProps } = BaseInputPropTypes

NumberInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  setIsValid: PropTypes.func,
  ...numberProps
}

/**
 * Provide defaults for props that are used in this input
 */

NumberInput.defaultProps = {
  min: -Infinity,
  max: Infinity,
  value: NaN,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {}
}
