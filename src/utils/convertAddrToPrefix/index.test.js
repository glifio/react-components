import { CoinType } from '@glif/filecoin-address'
import convertAddress from '.'

describe('convertAddress', () => {
  test('it keeps an f address to an f address', () => {
    expect(convertAddress('f033525', CoinType.MAIN)).toBe('f033525')
  })

  test('it converts an f address to a t address', () => {
    expect(convertAddress('f033525', CoinType.TEST)).toBe('t033525')
  })

  test('it returns an empty string when no address is passed', () => {
    expect(convertAddress('', CoinType.TEST)).toBe('')
  })
})
