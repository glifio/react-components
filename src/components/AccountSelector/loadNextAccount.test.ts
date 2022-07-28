import { FilecoinNumber } from '@glif/filecoin-number'
import { mockWalletProviderInstance } from '../../../__mocks__/@glif/filecoin-wallet-provider'

import { loadNextAccount } from './loadNextAccount'
import { WALLET_ID } from '../../test-utils/constants'
import { CoinType } from '@glif/filecoin-address'
import { createPath } from '../../utils'
import { coinTypeCode } from '@glif/filecoin-wallet-provider/dist/utils'

// Note this test does not yet test the recursive nature of loadNextAccount
describe('loadNextAccount', () => {
  test('it calls walletList with the loaded wallet', async () => {
    const walletIdx = 5
    const balance = new FilecoinNumber('0', 'fil')
    const getBalanceSpy = jest.fn().mockImplementation(async () => balance)

    const getAddressSpy = jest.fn().mockImplementation(async address => ({
      data: {
        address: {
          robust: address,
          id: WALLET_ID
        }
      }
    }))

    const setLoadedFirstWalletSpy = jest.fn()
    const setLoadingPageSpy = jest.fn()
    const setLoadingWalletsSpy = jest.fn()
    const walletListSpy = jest.fn()

    await loadNextAccount(
      walletIdx,
      // @ts-ignore
      mockWalletProviderInstance,
      CoinType.TEST,
      getBalanceSpy,
      getAddressSpy,
      setLoadedFirstWalletSpy,
      setLoadingPageSpy,
      setLoadingWalletsSpy,
      walletListSpy
    )

    expect(walletListSpy).toHaveBeenLastCalledWith([
      {
        address: 't1mbk7q6gm4rjlndfqw6f2vkfgqotres3fgicb5uq',
        balance,
        id: WALLET_ID,
        path: createPath(coinTypeCode(CoinType.TEST), walletIdx),
        robust: 't1mbk7q6gm4rjlndfqw6f2vkfgqotres3fgicb5uq'
      }
    ])
  })
})
