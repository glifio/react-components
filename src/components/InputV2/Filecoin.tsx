import PropTypes from 'prop-types'
import { useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'
import { FILECOIN_NUMBER_PROPTYPE } from '../../customPropTypes'

type FilecoinDenomination = 'fil' | 'picofil' | 'attofil'

/**
 * Since Infinity and NaN don't exist as useful defaults,
 * we use this method to check if the prop has been passed
 **/
const isFilecoinNumber = value =>
  typeof value === 'object' &&
  'toFil' in value &&
  'toAttoFil' in value &&
  'toPicoFil' in value

/**
 * Get the string representation of the Filecoin number for the required denomination
 **/
const getValue = (value: FilecoinNumber, denom: FilecoinDenomination) => {
  switch (denom) {
    case 'fil':
      return value.toFil()
    case 'picofil':
      return value.toPicoFil()
    case 'attofil':
      return value.toAttoFil()
    default:
      return ''
  }
}

/**
 * Get the unit representation for the required denomination
 **/
const getUnit = (denom: FilecoinDenomination) => {
  switch (denom) {
    case 'fil':
      return 'FIL'
    case 'picofil':
      return 'pFIL'
    case 'attofil':
      return 'aFIL'
    default:
      return ''
  }
}

/**
 * FilecoinInput
 *
 * This input is based on the NumberInput, with the difference that
 * min, max and value are of type "FilecoinNumber" and not "number".
 *
 * Instead of triggering "onChange", "onFocus" and "onBlur" with NaN,
 * these methods will not be called when the input is empty or invalid.
 */
export const FilecoinInput = ({
  min,
  max,
  value,
  denom,
  onChange,
  onFocus,
  onBlur,
  setIsValid,
  ...baseProps
}: FilecoinInputProps) => {
  const [error, setError] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)

  const onChangeBase = (newValue: string) => {
    setError('')
    setHasError(false)
    try {
      onChange(new FilecoinNumber(newValue, denom))
    } catch (e) {
      // Ignore faulty input while the element has focus
    }
  }

  const onFocusBase = (newValue: string) => {

  }
  
  const onBlurBase = (newValue: string) => {
    if (!newValue) {
      setError(`Cannot be empty`)
      setHasError(true)
      return
    }
    try {
      const filecoin = new FilecoinNumber(newValue, denom)
      if (isFilecoinNumber(min) && filecoin.isLessThan(min)) {
        setError(
          `Cannot be less than ${getValue(min, denom)} ${getUnit(denom)}`
        )
        setHasError(true)
      }
      if (isFilecoinNumber(max) && filecoin.isGreaterThan(max)) {
        setError(
          `Cannot be more than ${getValue(max, denom)} ${getUnit(denom)}`
        )
        setHasError(true)
      }
      onBlur(filecoin)
    } catch (e) {
      setError(`Must be a valid Filecoin number`)
      setHasError(true)
    }
  }

  return (
    <BaseInput
      error={showError ? error : ''}
      type='number'
      unit={getUnit(denom)}
      value={isFilecoinNumber(value) ? getValue(value, denom) : ''}
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
 * error: set by filecoin input validation
 * type: always "number" for filecoin input
 * unit: will be based on the FilecoinDenomination
 * value: needs to be of type "FilecoinNumber" / "FILECOIN_NUMBER_PROPTYPE"
 * onChange: needs to take "FilecoinNumber" type argument
 * onBlur: needs to take "FilecoinNumber" type argument
 */

export type FilecoinInputProps = {
  min?: FilecoinNumber
  max?: FilecoinNumber
  value?: FilecoinNumber
  denom?: FilecoinDenomination
  onChange?: (value: FilecoinNumber) => void
  onFocus?: (value: FilecoinNumber) => void
  onBlur?: (value: FilecoinNumber) => void
  setIsValid?: (hasError: boolean) => void
} & Omit<
  BaseInputProps,
  'error' | 'type' | 'unit' | 'value' | 'onChange' | 'onFocus' | 'onBlur'
>

// "onChange", "onFocus" and "onBlur" remain of type "PropTypes.func"
const { error, type, unit, value, ...filecoinProps } = BaseInputPropTypes

FilecoinInput.propTypes = {
  min: FILECOIN_NUMBER_PROPTYPE,
  max: FILECOIN_NUMBER_PROPTYPE,
  value: FILECOIN_NUMBER_PROPTYPE,
  denom: PropTypes.oneOf(['fil', 'picofil', 'attofil']),
  setIsValid: PropTypes.func,
  ...filecoinProps
}

// "min", "max" and "value" have no useful defaults for FilecoinNumber
FilecoinInput.defaultProps = {
  denom: 'fil',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {}
}
