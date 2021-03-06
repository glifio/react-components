import PropTypes from 'prop-types'
import { useEffect, useState, useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'
import { FILECOIN_NUMBER_PROPTYPE } from '../../customPropTypes'

type FilecoinDenomination = 'fil' | 'picofil' | 'attofil'

/**
 * Converts a string value into a FilecoinNumber or null if invalid
 */
const getFilecoinNumber = (
  value: string,
  denom: FilecoinDenomination
): FilecoinNumber | null => {
  try {
    return value ? new FilecoinNumber(value, denom) : null
  } catch (e) {
    return null
  }
}

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
  onEnter,
  setIsValid,
  ...baseProps
}: FilecoinInputProps) => {
  const [valueBase, setValueBase] = useState<string>('')
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(() => {
    if (value === null) return 'Invalid value'
    if (min !== null && value.isLessThan(min))
      return `Cannot be less than ${getValue(min, denom)} ${getUnit(denom)}`
    if (max !== null && value.isGreaterThan(max))
      return `Cannot be more than ${getValue(max, denom)} ${getUnit(denom)}`
    return ''
  }, [min, max, value, denom])

  // Communicate validity to parent component
  useEffect(() => setIsValid(!error), [setIsValid, error])

  // Update "valueBase" (string) from "value" (FilecoinNumber) when the input
  // doesn't have focus. This prevents undesired behaviour while entering numbers
  useEffect(() => {
    if (!hasFocus) setValueBase(value === null ? '' : getValue(value, denom))
  }, [hasFocus, value, denom])

  // Set "valueBase" (string) and "value" (FilecoinNumber) when input changes
  const onChangeBase = (newValueBase: string) => {
    setHasChanged(true)
    setValueBase(newValueBase)
    const newValue = getFilecoinNumber(newValueBase, denom)
    if (
      (value === null && newValue !== null) ||
      (value !== null && !value.isEqualTo(newValue))
    ) {
      onChange(newValue)
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

  // Update "valueBase" (string) from "value" (FilecoinNumber)
  // when pressing enter to format the input value
  const onEnterBase = () => {
    setValueBase(value === null ? '' : getValue(value, denom))
    onEnter()
  }

  return (
    <BaseInput
      error={!hasFocus && hasChanged ? error : ''}
      type='number'
      unit={getUnit(denom)}
      min={min === null ? '' : getValue(min, denom)}
      max={max === null ? '' : getValue(max, denom)}
      value={valueBase}
      onChange={onChangeBase}
      onFocus={onFocusBase}
      onBlur={onBlurBase}
      onEnter={onEnterBase}
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
 * min: needs to be of type "FilecoinNumber" / "FILECOIN_NUMBER_PROPTYPE"
 * max: needs to be of type "FilecoinNumber" / "FILECOIN_NUMBER_PROPTYPE"
 * value: needs to be of type "FilecoinNumber" / "FILECOIN_NUMBER_PROPTYPE"
 * onChange: needs to take "FilecoinNumber" type argument
 *
 * We add "denom" and "setIsValid"
 */

export type FilecoinInputProps = {
  min?: FilecoinNumber | null
  max?: FilecoinNumber | null
  value?: FilecoinNumber | null
  denom?: FilecoinDenomination
  onChange?: (value: FilecoinNumber | null) => void
  setIsValid?: (isValid: boolean) => void
} & Omit<
  BaseInputProps,
  'error' | 'type' | 'unit' | 'min' | 'max' | 'value' | 'onChange'
>

// "onChange" remains "PropTypes.func", so doesn't need an override
const { error, type, unit, min, max, value, ...filecoinProps } =
  BaseInputPropTypes

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
  min: new FilecoinNumber(0, 'fil'),
  max: null,
  value: null,
  denom: 'fil',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onEnter: () => {},
  setIsValid: () => {}
}
