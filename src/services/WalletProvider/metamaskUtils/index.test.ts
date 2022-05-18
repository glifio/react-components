import { errors } from '@glif/filecoin-wallet-provider'
import { metaMaskEnable, MetaMaskState, reportMetaMaskError } from '.'

const adapterModule = '@chainsafe/filsnap-adapter'

interface MetaMaskWindowProvider {
  isUnlocked: () => boolean
}

interface Ethereum {
  _metamask: MetaMaskWindowProvider
}

declare global {
  interface Window {
    ethereum: Ethereum
  }
}

describe('metamask error handling', () => {
  describe('metaMaskEnable', () => {
    beforeEach(() => {
      // @ts-expect-error
      window.ethereum = {}
      // @ts-expect-error
      window.ethereum._metamask = {}
      window.ethereum._metamask.isUnlocked = jest.fn()
      jest.clearAllMocks()
    })
    test('it throws a MetaMaskNotInstalledError when metamask is not installed', async () => {
      jest
        .spyOn(require(adapterModule), 'hasMetaMask')
        .mockImplementation(() => false)

      try {
        await metaMaskEnable()
      } catch (err) {
        expect(err instanceof errors.MetaMaskNotInstalledError).toBeTruthy()
      }
    })

    test('it throws a MetaMaskSnapsNotSupportedError when metamask is not on the right version', async () => {
      jest
        .spyOn(require(adapterModule), 'hasMetaMask')
        .mockImplementation(() => true)

      jest
        .spyOn(require(adapterModule), 'isMetamaskSnapsSupported')
        .mockImplementation(() => false)

      try {
        await metaMaskEnable()
      } catch (err) {
        expect(
          err instanceof errors.MetaMaskSnapsNotSupportedError
        ).toBeTruthy()
      }
    })

    test('it throws a MetaMaskLockedError when metamask is locked', async () => {
      jest
        .spyOn(require(adapterModule), 'hasMetaMask')
        .mockImplementation(() => true)

      jest
        .spyOn(require(adapterModule), 'isMetamaskSnapsSupported')
        .mockImplementation(() => true)

      window.ethereum._metamask.isUnlocked = jest.fn(() => false)

      try {
        await metaMaskEnable()
      } catch (err) {
        expect(err instanceof errors.MetaMaskLockedError).toBeTruthy()
      }
    })

    test('it throws a MetaMaskFilSnapNotInstalledError when snap is not installed', async () => {
      jest
        .spyOn(require(adapterModule), 'hasMetaMask')
        .mockImplementation(() => true)

      jest
        .spyOn(require(adapterModule), 'isMetamaskSnapsSupported')
        .mockImplementation(() => true)

      window.ethereum._metamask.isUnlocked = jest.fn(() => true)

      jest
        .spyOn(require(adapterModule), 'isSnapInstalled')
        .mockImplementation(() => false)

      try {
        await metaMaskEnable()
      } catch (err) {
        expect(
          err instanceof errors.MetaMaskFilSnapNotInstalledError
        ).toBeTruthy()
      }
    })
  })

  describe('reportMetaMaskError', () => {
    test('it reports ext uninstalled errors', () => {
      const state: MetaMaskState = {
        extInstalled: false,
        extUnlocked: false,
        snapInstalled: false,
        extSupportsSnap: false,
        snapEnabled: false,
        loading: false,
        error: true
      }
      const errString = reportMetaMaskError(state)
      expect(errString).toBe('Please install MetaMask to continue.')
    })

    test('it reports ext locked errors', () => {
      const state: MetaMaskState = {
        extInstalled: true,
        extUnlocked: false,
        snapInstalled: false,
        extSupportsSnap: false,
        snapEnabled: false,
        loading: false,
        error: true
      }
      const errString = reportMetaMaskError(state)
      expect(errString).toBe('Your MetaMask is locked!')
    })

    test('it reports ext does not support snaps errs', () => {
      const state: MetaMaskState = {
        extInstalled: true,
        extUnlocked: true,
        extSupportsSnap: false,
        snapInstalled: false,
        loading: false,
        snapEnabled: false,
        error: true
      }
      const errString = reportMetaMaskError(state)
      expect(errString).toBe(
        'Please upgrade MetaMask to the latest version to continue.'
      )
    })

    test('it reports snap not installed errors', () => {
      const state: MetaMaskState = {
        extInstalled: true,
        extUnlocked: true,
        snapInstalled: false,
        extSupportsSnap: true,
        loading: false,
        snapEnabled: false,
        error: true
      }
      const errString = reportMetaMaskError(state)
      expect(errString).toBe('Please install FILSnap to continue.')
    })

    test('it reports snap disabled errors', () => {
      const state: MetaMaskState = {
        extInstalled: true,
        extUnlocked: true,
        snapInstalled: false,
        extSupportsSnap: true,
        loading: false,
        snapEnabled: false,
        error: true
      }
      const errString = reportMetaMaskError(state)
      expect(errString).toBe('Please install FILSnap to continue.')
    })
  })
})
