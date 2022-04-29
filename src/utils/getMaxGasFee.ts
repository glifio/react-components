import { BigNumber, FilecoinNumber } from '@glif/filecoin-number'

interface GetMaxGasFeeParams {
  gasFeeCap: FilecoinNumber
  gasLimit: FilecoinNumber
}

export const getMaxGasFee = ({
  gasFeeCap,
  gasLimit
}: GetMaxGasFeeParams): FilecoinNumber => {
  const gasFeeCapBigNr = new BigNumber(gasFeeCap.toAttoFil())
  const gasLimitBigNr = new BigNumber(gasLimit.toAttoFil())
  const maxGasFeeBigNr = gasFeeCapBigNr.times(gasLimitBigNr)
  return new FilecoinNumber(maxGasFeeBigNr.toString(), 'attofil')
}
