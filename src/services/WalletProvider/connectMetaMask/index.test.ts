import Filecoin, { errors } from '@glif/filecoin-wallet-provider'
import connectMetaMask from '.'
import { WalletProviderAction } from '../types'
const adapterModule = '@chainsafe/filsnap-adapter/build/snap'

const mmSnapApiMock = jest.fn().mockImplementation(() => {
  return { configure: () => {} }
})

describe('connectMetaMask', () => {
  const dispatchSpy = jest.fn()

  jest
    .spyOn(require(adapterModule), 'MetamaskFilecoinSnap')
    .mockImplementation(() => {
      return {
        getFilecoinSnapApi: () => mmSnapApiMock()
      }
    })

  beforeEach(jest.clearAllMocks)

  test('it returns a metamask provider and dispatches a success configuration action', async () => {
    jest
      .spyOn(require('../../../utils/metamask/errorHandling'), 'metaMaskEnable')
      .mockImplementation(() => true)

    const provider = await connectMetaMask(dispatchSpy)
    expect(provider instanceof Filecoin).toBeTruthy()
    expect(provider.wallet.type).toBe('METAMASK')

    expect(
      dispatchSpy.mock.calls[dispatchSpy.mock.calls.length - 1][0].type
    ).toBe('METAMASK_CONFIGURED_SUCCESS')
  })

  test('it returns an existing metamask provider if one is passed', async () => {
    jest
      .spyOn(require('../../../utils/metamask/errorHandling'), 'metaMaskEnable')
      .mockImplementation(() => true)

    const provider = await connectMetaMask(dispatchSpy)
    jest.clearAllMocks()
    // @ts-ignore
    provider.wallet.mock = true
    const reusedProvider = await connectMetaMask(dispatchSpy, provider.wallet)
    expect(reusedProvider instanceof Filecoin).toBeTruthy()
    expect(reusedProvider.wallet.type).toBe('METAMASK')
    // @ts-ignore
    expect(reusedProvider.wallet.mock).toBeTruthy()
    expect(
      dispatchSpy.mock.calls[dispatchSpy.mock.calls.length - 1][0].type
    ).toBe('METAMASK_CONFIGURED_SUCCESS')
  })

  describe('error handling', () => {
    const findErrorDispatchCall = (spy: jest.Mock) => {
      return spy.mock.calls[
        spy.mock.calls.length - 1
      ][0] as WalletProviderAction
    }
    test('it handles metamask not installed errs', async () => {
      jest
        .spyOn(
          require('../../../utils/metamask/errorHandling'),
          'metaMaskEnable'
        )
        .mockImplementation(() => {
          throw new errors.MetaMaskNotInstalledError()
        })

      await connectMetaMask(dispatchSpy)
      const errCall = findErrorDispatchCall(dispatchSpy)
      expect(errCall.type).toBe('METAMASK_CONFIGURED_FAIL')
      expect(errCall.payload.extInstalled).toBeFalsy()
    })

    test('it handles metamask not support snap errs', async () => {
      jest
        .spyOn(
          require('../../../utils/metamask/errorHandling'),
          'metaMaskEnable'
        )
        .mockImplementation(() => {
          throw new errors.MetaMaskSnapsNotSupportedError()
        })

      await connectMetaMask(dispatchSpy)
      const errCall = findErrorDispatchCall(dispatchSpy)
      expect(errCall.type).toBe('METAMASK_CONFIGURED_FAIL')
      expect(errCall.payload.extInstalled).toBeTruthy()
      expect(errCall.payload.extUnlocked).toBeTruthy()
      expect(errCall.payload.extSupportsSnap).toBeFalsy()
    })

    test('it handles metamask locked errs', async () => {
      jest
        .spyOn(
          require('../../../utils/metamask/errorHandling'),
          'metaMaskEnable'
        )
        .mockImplementation(() => {
          throw new errors.MetaMaskLockedError()
        })

      await connectMetaMask(dispatchSpy)
      const errCall = findErrorDispatchCall(dispatchSpy)
      expect(errCall.type).toBe('METAMASK_CONFIGURED_FAIL')
      expect(errCall.payload.extInstalled).toBeTruthy()
      expect(errCall.payload.extSupportsSnap).toBeTruthy()
      expect(errCall.payload.extUnlocked).toBeFalsy()
    })

    test('it handles filsnap not installed errs', async () => {
      jest
        .spyOn(
          require('../../../utils/metamask/errorHandling'),
          'metaMaskEnable'
        )
        .mockImplementation(() => {
          throw new errors.MetaMaskFilSnapNotInstalledError()
        })

      await connectMetaMask(dispatchSpy)
      const errCall = findErrorDispatchCall(dispatchSpy)
      expect(errCall.type).toBe('METAMASK_CONFIGURED_FAIL')
      expect(errCall.payload.extInstalled).toBeTruthy()
      expect(errCall.payload.extSupportsSnap).toBeTruthy()
      expect(errCall.payload.extUnlocked).toBeTruthy()
      expect(errCall.payload.snapInstalled).toBeFalsy()
    })

    test('it handles unhandled errors', async () => {
      jest
        .spyOn(
          require('../../../utils/metamask/errorHandling'),
          'metaMaskEnable'
        )
        .mockImplementation(() => true)

      jest
        .spyOn(require(adapterModule), 'MetamaskFilecoinSnap')
        .mockImplementation(() => {
          throw new Error()
        })

      await connectMetaMask(dispatchSpy)
      const errCall = findErrorDispatchCall(dispatchSpy)
      expect(errCall.type).toBe('METAMASK_CONFIGURED_FAIL')
    })
  })
})
