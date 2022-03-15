import { CoinType } from '@glif/filecoin-address'
import convertAddress from '.'

describe('convertAddrToF', () => {
  test('it converts a t address to an f address by default', () => {
    process.env.NEXT_PUBLIC_COIN_TYPE = 'f'
    expect(convertAddress('t033525')).toBe('f033525')
  })
  test('it keeps an f address to an f address', () => {
    process.env.NEXT_PUBLIC_COIN_TYPE = 'f'
    expect(convertAddress('f033525')).toBe('f033525')
  })

  test('it converts an f address to a t address', () => {
    process.env.NEXT_PUBLIC_COIN_TYPE = 't'
    expect(convertAddress('f033525', CoinType.TEST)).toBe('t033525')
  })

  test('it returns an empty string when no address is passed', () => {
    expect(convertAddress()).toBe('')
  })
})
