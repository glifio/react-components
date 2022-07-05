import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'

export function attoFilToFil(amount: string | number | BigNumber): string {
  return new FilecoinNumber(amount, 'attofil').toFil() + ' FIL'
}

export function getGasPercentage(
  gasLimitStr: number | string,
  gasCostStr: number | string,
  pending: boolean
): string {
  if (pending) return ''
  const gasLimit = new FilecoinNumber(gasLimitStr, 'attofil')
  const gasUsed = new FilecoinNumber(gasCostStr, 'attofil')
  return gasUsed.dividedBy(gasLimit).times(100).toFixed(1) + '%'
}

export function formatNumber(input: string | number | BigNumber): string {
  const bigNr = input instanceof BigNumber ? input : new BigNumber(input)
  return bigNr.toFormat()
}

export function removeMessageDups(
  existing: { __ref: any }[],
  incoming: { __ref: any }[],
  args: { offset: number; limit: number }
) {
  const head = [...existing]
  const tail = head.splice(args.offset * args.limit)
  const merged = [].concat(head, incoming, tail)

  const found = new Set([])
  return [...merged].filter(ele => {
    if (!found.has(ele.__ref)) {
      found.add(ele.__ref)
      return true
    }

    return false
  })
}
