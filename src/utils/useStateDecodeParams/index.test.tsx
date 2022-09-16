import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { useStateDecodeParams } from '.'
import { isAddrEqual } from '../isAddrEqual'
import { TestEnvironment } from '../../test-utils/TestEnvironment'
import { MULTISIG_ACTOR_ADDRESS } from '../../test-utils/constants'

const TEST_PARAMS_BASE64 =
  'hFUCxE8k2pbD8cNKuliQp50ZVSUCaM9ABVgYglUB9IseWZen3UuDF4QYATDDLAoQSZz0'
const TEST_PARAMS_DECODED = {
  To: 't2yrhsjwuwypy4gsv2lcikphizkusqe2gp3pp4w5q',
  Value: '0',
  Method: 5,
  Params: 'glUB9IseWZen3UuDF4QYATDDLAoQSZz0'
}

jest
  .spyOn(require('@glif/filecoin-rpc-client'), 'default')
  .mockImplementation(() => {
    return {
      request: jest.fn(async (method, address, methodNum, base64) => {
        if (method !== 'StateDecodeParams') throw new Error('unknown method')
        if (!isAddrEqual(address, MULTISIG_ACTOR_ADDRESS))
          throw new Error('getting actor: actor not found')
        if (methodNum !== 2)
          throw new Error(
            `getting params type: unknown method ${methodNum} for actor`
          )
        if (base64 !== TEST_PARAMS_BASE64)
          throw new Error(
            "unmarshaling params for 'Filecoin.StateDecodeParams' (param: *[]uint8): illegal base64 data at input byte 64"
          )
        return TEST_PARAMS_DECODED
      })
    }
  })

const wrapper = ({ children }) => <TestEnvironment>{children}</TestEnvironment>

describe('useStateDecodeParams', () => {
  test('should return null when not passing an address', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useStateDecodeParams('', 2, TEST_PARAMS_BASE64),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.params).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
  })

  test('should return an error when passing an invalid address', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useStateDecodeParams('t1', 2, TEST_PARAMS_BASE64),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.params).toBeUndefined()
    expect(result.current.loading).toBe(false)
    expect(result.current.error?.message).toBe('Invalid actor address')
  })

  test('should return an error when passing an invalid method', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useStateDecodeParams(MULTISIG_ACTOR_ADDRESS, 20, TEST_PARAMS_BASE64),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.params).toBeUndefined()
    expect(result.current.loading).toBe(false)
    expect(
      result.current.error?.message.includes(`unknown method 20 for actor`)
    ).toBe(true)
  })

  test('should return null when not passing parameters', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useStateDecodeParams(MULTISIG_ACTOR_ADDRESS, 2, ''),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.params).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
  })

  test('should return an error when passing invalid parameters', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useStateDecodeParams(MULTISIG_ACTOR_ADDRESS, 2, 'abc123'),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.params).toBeUndefined()
    expect(result.current.loading).toBe(false)
    expect(
      result.current.error?.message.includes(
        `illegal base64 data at input byte 64`
      )
    ).toBe(true)
  })

  test('should return the decoded paramters', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useStateDecodeParams(MULTISIG_ACTOR_ADDRESS, 2, TEST_PARAMS_BASE64),
      { wrapper }
    )

    await waitForNextUpdate()

    expect(result.current.params?.To).toBe(TEST_PARAMS_DECODED.To)
    expect(result.current.params?.Value).toBe(TEST_PARAMS_DECODED.Value)
    expect(result.current.params?.Method).toBe(TEST_PARAMS_DECODED.Method)
    expect(result.current.params?.Params).toBe(TEST_PARAMS_DECODED.Params)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
  })
})
