import { BigNumber, FilecoinNumber } from '@glif/filecoin-number'

export const getMaxGasFee = (
  gasFeeCap: FilecoinNumber,
  gasLimit: FilecoinNumber | number
): FilecoinNumber => {
  const gasFeeCapBigNr = new BigNumber(gasFeeCap.toAttoFil())
  const maxGasFeeBigNr = gasFeeCapBigNr.times(
    typeof gasLimit === 'number' ? gasLimit : gasLimit.toAttoFil()
  )
  return new FilecoinNumber(maxGasFeeBigNr.toString(), 'attofil')
}
