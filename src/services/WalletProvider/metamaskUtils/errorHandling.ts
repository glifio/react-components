import { errors as walletProviderErrors } from '@glif/filecoin-wallet-provider'
import {
  isMetamaskSnapsSupported,
  hasMetaMask,
  isSnapInstalled
} from '@chainsafe/filsnap-adapter'
import { MetaMaskState } from './state'
import { FILSNAP } from '../../../constants'

export const isUnlocked = async (): Promise<boolean> => {
  return window.ethereum._metamask.isUnlocked()
}

const {
  MetaMaskNotInstalledError,
  MetaMaskSnapsNotSupportedError,
  MetaMaskLockedError,
  MetaMaskFilSnapNotInstalledError
} = walletProviderErrors

export const metaMaskEnable = async (): Promise<void> => {
  const mmInstalled = await hasMetaMask()
  if (!mmInstalled) {
    throw new MetaMaskNotInstalledError()
  }
  const mmSnapsSupported = await isMetamaskSnapsSupported()
  if (!mmSnapsSupported) {
    throw new MetaMaskSnapsNotSupportedError()
  }

  const mmUnlocked = await isUnlocked()
  if (!mmUnlocked) {
    throw new MetaMaskLockedError()
  }

  const filSnapInstalled = await isSnapInstalled(FILSNAP)
  if (!filSnapInstalled) {
    throw new MetaMaskFilSnapNotInstalledError()
  }
}

export const reportMetaMaskError = (state: MetaMaskState): string => {
  if (state.error) {
    if (!state.extInstalled) return 'Please install MetaMask to continue.'
    else if (!state.extUnlocked) return 'Your MetaMask is locked!'
    else if (!state.extSupportsSnap)
      return 'Please upgrade MetaMask to the latest version to continue.'
    else if (!state.snapInstalled) return 'Please install FILSnap to continue.'
    else if (!state.snapEnabled)
      return 'Please enable FILSnap in MetaMask to continue.'
  }

  return ''
}
