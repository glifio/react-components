import { potentialDupMsg, ComparisonMessage } from './'
import {
  WALLET_ADDRESS,
  WALLET_ADDRESS_2,
  WALLET_ADDRESS_3,
  WALLET_ID,
  WALLET_ID_2
} from '../../test-utils/constants'
import { Message } from '@glif/filecoin-message'

describe('potentialDupMsg', () => {
  const CID = 'QmzXYZ'

  const comparisonMessage: ComparisonMessage = {
    cid: CID,
    from: { id: WALLET_ID, robust: WALLET_ADDRESS },
    to: { id: WALLET_ID_2, robust: WALLET_ADDRESS_2 },
    value: '0',
    method: '0',
    params: 'test',
    height: 1000
  }

  test('it returns the cid of an identical message within the last 900 epochs', () => {
    const message = new Message({
      to: WALLET_ADDRESS_2,
      from: WALLET_ADDRESS,
      value: '0',
      method: 0,
      params: 'test',
      nonce: 0
    })

    expect(potentialDupMsg(comparisonMessage, message, 1200)).toBe(CID)
  })

  test('it returns null for different messages', () => {
    const message = new Message({
      to: WALLET_ADDRESS_2,
      from: WALLET_ADDRESS,
      value: '0',
      method: 0,
      params: '',
      nonce: 0
    })

    expect(potentialDupMsg(comparisonMessage, message, 1200)).toBe(null)

    const differentParams = new Message({
      to: WALLET_ADDRESS_2,
      from: WALLET_ADDRESS,
      value: '0',
      params: 'test1',
      method: 0,
      nonce: 0
    })

    expect(potentialDupMsg(comparisonMessage, differentParams, 1200)).toBe(null)

    const differentToAddr = new Message({
      to: WALLET_ADDRESS_3,
      from: WALLET_ADDRESS,
      value: '0',
      params: 'test1',
      method: 0,
      nonce: 0
    })

    expect(potentialDupMsg(comparisonMessage, differentToAddr, 1200)).toBe(null)
  })

  test('it returns null when the height of the last confirmed message is >900 epochs', () => {
    const message = new Message({
      to: WALLET_ADDRESS_2,
      from: WALLET_ADDRESS,
      value: '0',
      method: 0,
      params: 'test',
      nonce: 0
    })

    expect(potentialDupMsg(comparisonMessage, message, 2000)).toBe(null)
  })

  test('it returns the cid of an identical pending message', () => {
    const message = new Message({
      to: WALLET_ADDRESS_2,
      from: WALLET_ADDRESS,
      value: '0',
      method: 0,
      params: 'test',
      nonce: 0
    })

    expect(potentialDupMsg(comparisonMessage, message, 2000, true)).toBe(CID)
  })
})
