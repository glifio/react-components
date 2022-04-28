import PropTypes from 'prop-types'
import { useEffect, useState, useMemo } from 'react'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

/**
 * BigIntInput
 *
 * This input is based on the NumberInput, with the difference
 * that min, max and value are of type "bigint" and not "number".
 *
 * When the input field is empty, the value will be "null".
 */
export const BigIntInput = ({
  min,
  max,
  value,
  onChange,
  onFocus,
  onBlur,
  setIsValid,
  ...baseProps
}: BigIntInputProps) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(() => {
    if (value === null) return 'Cannot be empty or fractional number'
    if (min !== null && value < min)
      return `Cannot be less than ${min.toString()}`
    if (max !== null && value > max)
      return `Cannot be more than ${max.toString()}`
    return ''
  }, [min, max, value])

  // Communicate validity to parent component
  useEffect(() => setIsValid(!error), [setIsValid, error])

  const onChangeBase = (newValue: string) => {
    try {
      onChange(newValue ? BigInt(newValue) : null)
    } catch (e) {
      onChange(null)
    }
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
      error={hasFocus ? '' : error}
      type='number'
      value={value === null ? '' : value.toString()}
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
 * error: set by bigint input validation
 * type: always "number" for bigint input
 * value: needs to be of type "BigInt" / "PropTypes.bigint"
 * onChange: needs to take "BigInt" type argument
 *
 * We add "min", "max" and "setIsValid"
 */

export type BigIntInputProps = {
  min?: BigInt | null
  max?: BigInt | null
  value?: BigInt | null
  onChange?: (value: BigInt | null) => void
  setIsValid?: (isValid: boolean) => void
} & Omit<BaseInputProps, 'error' | 'type' | 'value' | 'onChange'>

// "onChange" remains "PropTypes.func", so doesn't need an override
const { error, type, value, ...bigIntProps } = BaseInputPropTypes

// @types/prop-types is outdated
BigIntInput.propTypes = {
  // @ts-ignore
  min: PropTypes.bigint,
  // @ts-ignore
  max: PropTypes.bigint,
  // @ts-ignore
  value: PropTypes.bigint,
  setIsValid: PropTypes.func,
  ...bigIntProps
}

/**
 * Provide defaults for props that are used in this input
 */

BigIntInput.defaultProps = {
  min: null,
  max: null,
  value: null,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {}
}
