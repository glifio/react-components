import { isAddrEqual } from '.'
import {
  WALLET_ADDRESS,
  WALLET_ID,
  WALLET_ADDRESS_2,
  WALLET_ID_2
} from '../../test-utils/constants'

describe('isAddrEqual', () => {
  test('it accepts equal addresses', () => {
    expect(
      isAddrEqual(
        { id: WALLET_ID, robust: WALLET_ADDRESS },
        { id: WALLET_ID, robust: WALLET_ADDRESS }
      )
    ).toBe(true)
    expect(
      isAddrEqual({ id: WALLET_ID, robust: WALLET_ADDRESS }, WALLET_ID)
    ).toBe(true)
    expect(
      isAddrEqual({ id: WALLET_ID, robust: WALLET_ADDRESS }, WALLET_ADDRESS)
    ).toBe(true)
  })
  test('it rejects different addresses', () => {
    expect(
      isAddrEqual(
        { id: WALLET_ID, robust: WALLET_ADDRESS },
        { id: WALLET_ID_2, robust: WALLET_ADDRESS_2 }
      )
    ).toBe(false)
    expect(
      isAddrEqual({ id: WALLET_ID, robust: WALLET_ADDRESS }, WALLET_ID_2)
    ).toBe(false)
    expect(
      isAddrEqual({ id: WALLET_ID, robust: WALLET_ADDRESS }, WALLET_ADDRESS_2)
    ).toBe(false)

    // @ts-ignore
    expect(isAddrEqual(undefined, WALLET_ADDRESS_2)).toBe(false)

    expect(
      // @ts-ignore
      isAddrEqual({ id: WALLET_ID, robust: WALLET_ADDRESS }, undefined)
    ).toBe(false)
  })
})
