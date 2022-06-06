import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { Select, SelectProps, SelectPropTypes } from './Select'

/**
 * SelectNumber
 *
 * When the placeholder option is selected, value will be NaN. This is so we can
 * differentiate between 0 and empty input while value remains of type "number".
 */
export const SelectNumber = ({
  options,
  value,
  onChange,
  ...baseProps
}: SelectNumberProps) => {
  const [valueBase, setValueBase] = useState<string>(
    isNaN(value) ? '' : value.toString()
  )
  const optionsBase = useMemo<Array<string>>(
    () => options.map(option => option.toString()),
    [options]
  )

  // Update "valueBase" (string) from "value" (number)
  useEffect(() => setValueBase(isNaN(value) ? '' : value.toString()), [value])

  // Set "valueBase" (string) and "value" (number) when input changes
  const onChangeBase = (newValueBase: string) => {
    setValueBase(newValueBase)
    const newValue = newValueBase ? Number(newValueBase) : NaN
    if (newValue !== value) onChange(newValue)
  }

  return (
    <Select
      options={optionsBase}
      value={valueBase}
      onChange={onChangeBase}
      {...baseProps}
    />
  )
}

/**
 * We strip certain properties from the standard
 * select props because we want to override them:
 *
 * options: needs to be of type "Array<number>" / "PropTypes.arrayOf(PropTypes.number)"
 * value: needs to be of type "number" / "PropTypes.number"
 * onChange: needs to take "number" type argument
 */

export type SelectNumberProps = {
  options?: Array<number>
  value?: number
  onChange?: (value: number) => void
} & Omit<SelectProps, 'options' | 'value' | 'onChange'>

// "onChange" remains "PropTypes.func", so doesn't need an override
const { options, value, ...selectNumberProps } = SelectPropTypes

SelectNumber.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number),
  value: PropTypes.number,
  ...selectNumberProps
}

/**
 * Provide defaults for props that are used in this input
 */

SelectNumber.defaultProps = {
  options: [],
  value: NaN,
  onChange: () => {}
}
