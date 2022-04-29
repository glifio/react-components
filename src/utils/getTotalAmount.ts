import { BigNumber, FilecoinNumber } from '@glif/filecoin-number'

export const getTotalAmount = (
  value: FilecoinNumber,
  maxFee: FilecoinNumber
): FilecoinNumber => {
  const valueBigNr = new BigNumber(value.toAttoFil())
  const maxFeeBigNr = new BigNumber(maxFee.toAttoFil())
  const totalAmountBigNr = valueBigNr.plus(maxFeeBigNr)
  return new FilecoinNumber(totalAmountBigNr.toString(), 'attofil')
}
