import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { range } from '../../utils'
import {
  SelectNumber,
  SelectNumberProps,
  SelectNumberPropTypes
} from './SelectNumber'

/**
 * SelectRange
 *
 * When the placeholder option is selected, value will be NaN. This is so we can
 * differentiate between 0 and empty input while value remains of type "number".
 */
export const SelectRange = ({
  min,
  max,
  step,
  ...baseProps
}: SelectRangeProps) => {
  const optionsBase = useMemo<Array<number>>(
    () => range(min, max, step),
    [min, max, step]
  )

  return <SelectNumber options={optionsBase} {...baseProps} />
}

/**
 * We strip certain properties from the standard
 * select number props because we want to override them:
 *
 * options: generated from min, max and step
 *
 * We add "min", "max" and "step"
 */

export type SelectRangeProps = {
  min?: number
  max?: number
  step?: number
} & Omit<SelectNumberProps, 'options'>

const { options, ...selectRangeProps } = SelectNumberPropTypes

SelectRange.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  ...selectRangeProps
}

/**
 * Provide defaults for props that are used in this input
 */

SelectRange.defaultProps = {
  min: 0,
  max: 0,
  step: 1
}
