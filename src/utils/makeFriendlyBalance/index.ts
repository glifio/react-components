import { BigNumber, FilecoinNumber } from '@glif/filecoin-number'

export const makeFriendlyBalance = (
  value: FilecoinNumber,
  decimals: number = 3
): string => {
  // Invalid value
  if (!FilecoinNumber.isFilecoinNumber(value)) {
    throw new Error('makeFriendlyBalance requires a valid FilecoinNumber value')
  }

  // Invalid decimals
  if (decimals < 0) {
    throw new Error('makeFriendlyBalance cannot handle negative decimals')
  }

  // NaN
  if (value.isNaN()) {
    throw new Error('Cannot make friendly balance for NaN value')
  }

  // Zero
  if (value.isZero()) return '0'

  const isNegative = value.isNegative()
  const minus = isNegative ? '-' : ''
  const absValue = value.absoluteValue()
  const dpValue = absValue.decimalPlaces(decimals, BigNumber.ROUND_DOWN)

  // Zero after stripping decimals
  if (dpValue.isZero()) {
    if (decimals === 0) return isNegative ? '< 0' : '> 0'

    const sign = isNegative ? '>' : '<'
    const nearest = `0.${Array(decimals - 1)
      .fill('0')
      .join('')}1`
    return `${sign} ${minus}${nearest}`
  }

  // Less than 1000
  if (absValue.isLessThan(1000)) {
    return (
      minus + absValue.decimalPlaces(decimals, BigNumber.ROUND_DOWN).toString()
    )
  }

  // 1K to 1B
  let power = 0
  const units = ['K', 'M', 'B']
  for (const unit of units) {
    power++
    const unitVal = dpValue.dividedBy(Math.pow(1000, power))
    if (unitVal.isLessThan(1000))
      return (
        minus + unitVal.decimalPlaces(3, BigNumber.ROUND_DOWN).toString() + unit
      )
  }

  return isNegative ? '< -999.9B' : '> 999.9B'
}
