import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'
import { FILECOIN_NUMBER_PROPTYPE } from '../../customPropTypes'

type FilecoinDenomination = 'fil' | 'picofil' | 'attofil'

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
 * When the input field is empty, the value will be "null".
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
    try {
      onChange(newValue ? new FilecoinNumber(newValue, denom) : null)
    } catch (e) {
      onChange(null)
    }
  }

  const onFocusBase = () => {
    setShowError(false)
    onFocus()
  }

  const onBlurBase = () => {
    setShowError(true)
    onBlur()
  }

  useEffect(() => {
    if (value === null) {
      setError(`Cannot be empty or invalid Filecoin value`)
      setIsValid(false)
      return
    }
    if (min !== null && value.isLessThan(min)) {
      setError(`Cannot be less than ${getValue(min, denom)} ${getUnit(denom)}`)
      setIsValid(false)
      return
    }
    if (max !== null && value.isGreaterThan(max)) {
      setError(`Cannot be more than ${getValue(max, denom)} ${getUnit(denom)}`)
      setIsValid(false)
      return
    }
    setError('')
    setIsValid(true)
  }, [min, max, value, denom, setIsValid])

  return (
    <BaseInput
      error={showError ? error : ''}
      type='number'
      unit={getUnit(denom)}
      value={value === null ? '' : getValue(value, denom)}
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
 *
 * We add min, max, denom and setIsValid
 */

export type FilecoinInputProps = {
  min?: FilecoinNumber | null
  max?: FilecoinNumber | null
  value?: FilecoinNumber | null
  denom?: FilecoinDenomination
  onChange?: (value: FilecoinNumber | null) => void
  setIsValid?: (hasError: boolean) => void
} & Omit<BaseInputProps, 'error' | 'type' | 'unit' | 'value' | 'onChange'>

// "onChange" remains "PropTypes.func", so doesn't need an override
const { error, type, unit, value, ...filecoinProps } = BaseInputPropTypes

FilecoinInput.propTypes = {
  min: FILECOIN_NUMBER_PROPTYPE,
  max: FILECOIN_NUMBER_PROPTYPE,
  value: FILECOIN_NUMBER_PROPTYPE,
  denom: PropTypes.oneOf(['fil', 'picofil', 'attofil']),
  setIsValid: PropTypes.func,
  ...filecoinProps
}

/**
 * Provide defaults for props that are used in this input
 */

FilecoinInput.defaultProps = {
  min: null,
  max: null,
  value: null,
  denom: 'fil',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {}
}
