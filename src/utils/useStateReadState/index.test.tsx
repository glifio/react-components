import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { getActorCode } from '@glif/filecoin-actor-utils'
import { FilecoinNumber } from '@glif/filecoin-number'

import { useStateReadState } from '.'
import { isAddrEqual } from '../isAddrEqual'
import { TestEnvironment } from '../../test-utils/TestEnvironment'
import { MULTISIG_ACTOR_ADDRESS } from '../../test-utils/constants'

jest
  .spyOn(require('@glif/filecoin-rpc-client'), 'default')
  .mockImplementation(() => {
    return {
      request: jest.fn(async (method, address) => {
        if (method !== 'StateReadState') throw new Error('unknown method')
        if (isAddrEqual(address, MULTISIG_ACTOR_ADDRESS))
          return {
            Balance: '1000000000000000000',
            Code: {
              '/': 'bafk2bzacec66wmb4kohuzvuxsulhcgiwju7sqkldwfpmmgw7dbbwgm5l2574q'
            },
            State: {
              Signers: ['t014278'],
              NumApprovalsThreshold: 1,
              NextTxnID: 0,
              InitialBalance: '1000000000000000000',
              StartEpoch: 239252,
              UnlockDuration: 100,
              PendingTxns: {
                '/': 'bafy2bzaceamp42wmmgr2g2ymg46euououzfyck7szknvfacqscohrvaikwfay'
              }
            }
          }
        throw new Error('getting actor: actor not found')
      })
    }
  })

const wrapper = ({ children }) => <TestEnvironment>{children}</TestEnvironment>

describe('useStateReadState', () => {
  test('should return null when not passing an address', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useStateReadState(''),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.notFound).toBe(false)
    expect(result.current.error).toBeUndefined()
  })

  test('should return an error when passing an invalid address', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useStateReadState('t1'),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.data).toBeUndefined()
    expect(result.current.loading).toBe(false)
    expect(result.current.notFound).toBe(false)
    expect(result.current.error?.message).toBe('Invalid actor address')
  })

  test('should return an error when the actor is not found', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useStateReadState('t011'),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.data).toBeUndefined()
    expect(result.current.loading).toBe(false)
    expect(result.current.notFound).toBe(true)
    expect(result.current.error).toBe(null)
  })

  test('should return the state for an msig actor', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useStateReadState(MULTISIG_ACTOR_ADDRESS),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.data?.Balance).toBe(
      new FilecoinNumber('1', 'fil').toAttoFil()
    )
    expect(result.current.data?.Code['/']).toBe(
      getActorCode('multisig', 'calibrationnet')
    )
    expect(result.current.data?.State).toBeTruthy()
    expect(result.current.loading).toBe(false)
    expect(result.current.notFound).toBe(false)
    expect(result.current.error).toBeUndefined()
  })
})
