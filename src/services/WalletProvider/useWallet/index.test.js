import { renderHook } from '@testing-library/react-hooks'
import { useWallet } from '.'
import composeMockAppTree from '../../../test-utils/composeMockAppTree'

jest.mock('../')

describe('useWallet', () => {
  test('it returns a nullWallet state when no wallet exists in redux', () => {
    const { Tree } = composeMockAppTree('preOnboard')
    const { result } = renderHook(useWallet, { wrapper: Tree })
    expect(result.current.address).toBeFalsy()
    expect(result.current.robust).toBeFalsy()
    expect(result.current.id).toBeFalsy()
    expect(result.current.path).toBeFalsy()
    expect(result.current.type).toBeFalsy()
    expect(result.current.balance.toString()).toBe('0')
  })

  test('it returns a wallet when one is selected in redux', async () => {
    const { Tree, getWalletProviderState } = composeMockAppTree('postOnboard')
    const {
      result: { current }
    } = renderHook(useWallet, { wrapper: Tree })

    const { wallets } = getWalletProviderState()
    expect(current.address).toBe(wallets[0].address)
    expect(current.robust).toBe(wallets[0].robust)
    expect(current.id).toBe(wallets[0].id)
    expect(current.path).toBe(wallets[0].path)
    expect(current.balance.toString()).toBe(wallets[0].balance.toString())
  })
})
