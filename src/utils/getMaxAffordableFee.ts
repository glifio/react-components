import { BigNumber, FilecoinNumber } from '@glif/filecoin-number'

interface GetMaxAffordableFeeParams {
  balance: FilecoinNumber
  value: FilecoinNumber
}

export const getMaxAffordableFee = ({
  balance,
  value
}: GetMaxAffordableFeeParams): FilecoinNumber => {
  const balanceBigNr = new BigNumber(balance.toAttoFil())
  const valueBigNr = new BigNumber(value.toAttoFil())
  const maxAffordableFeeBigNr = balanceBigNr.minus(valueBigNr)
  return new FilecoinNumber(maxAffordableFeeBigNr.toString(), 'attofil')
}
