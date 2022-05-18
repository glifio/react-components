import { SnapRpcMethodRequest } from '@chainsafe/filsnap-types'

interface MetaMaskWindowProvider {
  isUnlocked: () => boolean
}

interface Ethereum {
  _metamask: MetaMaskWindowProvider
  request: <T>(
    request: SnapRpcMethodRequest | { method: string; params?: any[] }
  ) => Promise<T>
}

declare global {
  interface Window {
    ethereum: Ethereum
  }
}
