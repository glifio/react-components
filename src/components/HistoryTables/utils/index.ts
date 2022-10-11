import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'

export function attoFilToFil(amount: string | number | BigNumber): string {
  return new FilecoinNumber(amount, 'attofil').toFil() + ' FIL'
}

export function formatNumber(input: string | number | BigNumber): string {
  const bigNr = input instanceof BigNumber ? input : new BigNumber(input)
  return bigNr.toFormat()
}
