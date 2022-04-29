import { BigNumber, FilecoinNumber } from '@glif/filecoin-number'

export const getMaxGasFee = (
  gasFeeCap: FilecoinNumber,
  gasLimit: FilecoinNumber
): FilecoinNumber => {
  const gasFeeCapBigNr = new BigNumber(gasFeeCap.toAttoFil())
  const gasLimitBigNr = new BigNumber(gasLimit.toAttoFil())
  const maxGasFeeBigNr = gasFeeCapBigNr.times(gasLimitBigNr)
  return new FilecoinNumber(maxGasFeeBigNr.toString(), 'attofil')
}
