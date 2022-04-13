import PropTypes from 'prop-types'
import { useState } from 'react'
import { TextInput, TextInputProps } from './Text'

const isBigInt = value => typeof value === 'bigint'

export const BigIntInput = ({
  min,
  max,
  value,
  onChange,
  onBlur,
  setHasError,
  ...textProps
}: BigIntInputProps) => {
  const [error, setError] = useState<string>('')
  const onChangeText = (newTextValue: string) => {
    setError('')
    setHasError(false)
    onChange(BigInt(newTextValue))
  }
  const onBlurText = (newTextValue: string) => {
    const bigint = BigInt(newTextValue)
    if (isBigInt(min) && bigint < min) {
      setError(`Has to be at least ${min.toString()}`)
      setHasError(true)
    }
    if (isBigInt(max) && bigint > max) {
      setError(`Cannot be more than ${max.toString()}`)
      setHasError(true)
    }
    onBlur(bigint)
  }

  return (
    <TextInput
      error={error}
      type='number'
      value={isBigInt(value) ? value.toString() : ''}
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
  onChange: (value: BigInt) => void
  onBlur: (value: BigInt) => void
  setHasError: (hasError: boolean) => void
} & Omit<TextInputProps, 'error' | 'type' | 'value' | 'onChange' | 'onBlur'>

// "onChange" and "onBlur" remain of type "PropTypes.func"
// eslint-disable-next-line
const { error, type, value, ...bigIntProps } = TextInput.propTypes

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

BigIntInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  setHasError: () => {}
}
