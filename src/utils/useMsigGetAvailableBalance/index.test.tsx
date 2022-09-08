import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { FilecoinNumber } from '@glif/filecoin-number'

import { useMsigGetAvailableBalance } from '.'
import { isAddrEqual } from '../isAddrEqual'
import { TestEnvironment } from '../../test-utils/TestEnvironment'
import { MULTISIG_ACTOR_ADDRESS } from '../../test-utils/constants'

const INIT_ACTOR_ADDRESS = 't01'

jest
  .spyOn(require('@glif/filecoin-rpc-client'), 'default')
  .mockImplementation(() => {
    return {
      request: jest.fn(async (method, address) => {
        if (method !== 'MsigGetAvailableBalance')
          throw new Error('unknown method')
        if (isAddrEqual(address, MULTISIG_ACTOR_ADDRESS))
          return '1000000000000000000'
        if (isAddrEqual(address, INIT_ACTOR_ADDRESS))
          throw new Error(
            'failed to load multisig actor state: actor code is not multisig: init'
          )
        throw new Error('getting actor: actor not found')
      })
    }
  })

const wrapper = ({ children }) => <TestEnvironment>{children}</TestEnvironment>

describe('useMsigGetAvailableBalance', () => {
  test('should return null when not passing an address', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useMsigGetAvailableBalance(''),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.availableBalance).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
  })

  test('should return an error when passing an invalid address', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useMsigGetAvailableBalance('t1'),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.availableBalance).toBeUndefined()
    expect(result.current.loading).toBe(false)
    expect(result.current.error?.message).toBe('Invalid actor address')
  })

  test('should return an error when the address is not for an msig actor', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useMsigGetAvailableBalance(INIT_ACTOR_ADDRESS),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.availableBalance).toBeUndefined()
    expect(result.current.loading).toBe(false)
    expect(
      result.current.error?.message.includes('actor code is not multisig')
    ).toBe(true)
  })

  test('should return the available balance for an msig actor', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useMsigGetAvailableBalance(MULTISIG_ACTOR_ADDRESS),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(
      FilecoinNumber.isFilecoinNumber(result.current.availableBalance)
    ).toBe(true)
    expect(result.current.availableBalance?.toFil()).toBe('1')
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
  })
})
