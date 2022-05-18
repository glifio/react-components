import PropTypes from 'prop-types'
import { useEffect, useState, useMemo } from 'react'
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
  const [valueBase, setValueBase] = useState<string>('')
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(() => {
    if (isNaN(value)) return 'Cannot be empty'
    if (value < min) return `Cannot be less than ${min}`
    if (value > max) return `Cannot be more than ${max}`
    return ''
  }, [min, max, value])

  // Communicate validity to parent component
  useEffect(() => setIsValid(!error), [setIsValid, error])

  // Set valueBase (string) when value (number) changes
  useEffect(() => {
    setValueBase(isNaN(value) ? '' : value.toString())
  }, [value])

  // Set valueBase (string) and value (number) when input changes
  const onChangeBase = (newValueBase: string) => {
    setValueBase(newValueBase)
    setHasChanged(true)
    const newValue = newValueBase ? Number(newValueBase) : NaN
    if (newValue !== value) onChange(newValue)
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
      type='number'
      min={min}
      max={max}
      value={valueBase}
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
 * min: needs to be of type "number" / "PropTypes.number"
 * max: needs to be of type "number" / "PropTypes.number"
 * value: needs to be of type "number" / "PropTypes.number"
 * onChange: needs to take "number" type argument
 *
 * We add "setIsValid"
 */

export type NumberInputProps = {
  min?: number
  max?: number
  value?: number
  onChange?: (value: number) => void
  setIsValid?: (isValid: boolean) => void
} & Omit<BaseInputProps, 'error' | 'type' | 'min' | 'max' | 'value' | 'onChange'>

// "onChange" remains "PropTypes.func", so doesn't need an override
const { error, type, min, max, value, ...numberProps } = BaseInputPropTypes

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
