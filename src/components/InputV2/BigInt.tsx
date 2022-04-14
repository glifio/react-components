import PropTypes from 'prop-types'
import { useState } from 'react'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

/**
 * Since Infinity and NaN don't exist as useful defaults,
 * we use this method to check if the prop has been passed
 **/
const isBigInt = value => typeof value === 'bigint'

/**
 * BigIntInput
 *
 * This input is based on the NumberInput, with the difference
 * that min, max and value are of type "bigint" and not "number".
 *
 * Instead of triggering "onChange" and "onBlur" with NaN, these
 * methods will not be called when the input is empty or invalid.
 */
export const BigIntInput = ({
  min,
  max,
  value,
  onChange,
  onBlur,
  setHasError,
  ...baseProps
}: BigIntInputProps) => {
  const [error, setError] = useState<string>('')
  const onChangeBase = (newValue: string) => {
    setError('')
    setHasError(false)
    try {
      onChange(BigInt(newValue))
    } catch (e) {
      // Ignore faulty input while the element has focus
    }
  }
  const onBlurBase = (newValue: string) => {
    if (!newValue) {
      setError(`Cannot be empty`)
      setHasError(true)
      return
    }
    try {
      const bigint = BigInt(newValue)
      if (isBigInt(min) && bigint < min) {
        setError(`Cannot be less than ${min.toString()}`)
        setHasError(true)
      }
      if (isBigInt(max) && bigint > max) {
        setError(`Cannot be more than ${max.toString()}`)
        setHasError(true)
      }
      onBlur(bigint)
    } catch (e) {
      setError(`Must be a whole number`)
      setHasError(true)
    }
  }

  return (
    <BaseInput
      error={error}
      type='number'
      value={isBigInt(value) ? value.toString() : ''}
      onChange={onChangeBase}
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
 * onBlur: needs to take "BigInt" type argument
 */

export type BigIntInputProps = {
  min?: BigInt
  max?: BigInt
  value?: BigInt
  onChange?: (value: BigInt) => void
  onBlur?: (value: BigInt) => void
  setHasError?: (hasError: boolean) => void
} & Omit<BaseInputProps, 'error' | 'type' | 'value' | 'onChange' | 'onBlur'>

// "onChange" and "onBlur" remain of type "PropTypes.func"
const { error, type, value, ...bigIntProps } = BaseInputPropTypes

// @types/prop-types is outdated
BigIntInput.propTypes = {
  // @ts-ignore
  min: PropTypes.bigint,
  // @ts-ignore
  max: PropTypes.bigint,
  // @ts-ignore
  value: PropTypes.bigint,
  setHasError: PropTypes.func,
  ...bigIntProps
}

// "min", "max" and "value" have no useful defaults for BigInt
BigIntInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  setHasError: () => {}
}
