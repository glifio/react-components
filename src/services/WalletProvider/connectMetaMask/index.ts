import { Dispatch } from 'react'
import Filecoin, {
  MetaMaskProvider,
  errors as walletProviderErrors
} from '@glif/filecoin-wallet-provider'
import { CoinType } from '@glif/filecoin-address'
import { MetamaskFilecoinSnap } from '@chainsafe/filsnap-adapter'
import { SnapConfig } from '@chainsafe/filsnap-types'

import { WalletProviderAction } from '../types'
import { clearError } from '../state'
import { metamaskConfigurationFail, metaMaskEnable } from '../metamaskUtils'
import { FILSNAP } from '../../../constants'

export default async function connectMetaMask(
  dispatch: Dispatch<WalletProviderAction>,
  // if one already exists... use it
  metamaskSubprovider: MetaMaskProvider,
  coinType: CoinType,
  lotusApiAddr: string
): Promise<Filecoin & { wallet: MetaMaskProvider }> {
  try {
    dispatch(clearError())
    dispatch({ type: 'METAMASK_RESET_STATE' })
    await metaMaskEnable()

    if (metamaskSubprovider) {
      dispatch({ type: 'METAMASK_CONFIGURED_SUCCESS' })

      return new Filecoin(metamaskSubprovider, {
        apiAddress: lotusApiAddr
      }) as Filecoin & { wallet: MetaMaskProvider }
    }

    const mm = new MetamaskFilecoinSnap(FILSNAP)

    const snapConfig: Partial<SnapConfig> = {
      network: coinType,
      rpc: {
        token: '',
        url: lotusApiAddr
      }
    }
    const snap = await mm.getFilecoinSnapApi()
    await snap.configure(snapConfig)

    const provider = new Filecoin(new MetaMaskProvider({ snap }), {
      apiAddress: lotusApiAddr
    }) as Filecoin & { wallet: MetaMaskProvider }

    dispatch({ type: 'METAMASK_CONFIGURED_SUCCESS' })

    return provider
  } catch (err) {
    if (err instanceof Error) {
      if (err instanceof walletProviderErrors.MetaMaskNotInstalledError) {
        dispatch(metamaskConfigurationFail({ extInstalled: false }))
      } else if (
        err instanceof walletProviderErrors.MetaMaskSnapsNotSupportedError
      ) {
        dispatch(
          metamaskConfigurationFail({
            extInstalled: true,
            extUnlocked: true,
            extSupportsSnap: false
          })
        )
      } else if (err instanceof walletProviderErrors.MetaMaskLockedError) {
        dispatch(
          metamaskConfigurationFail({
            extInstalled: true,
            extSupportsSnap: true,
            extUnlocked: false
          })
        )
      } else if (
        err instanceof walletProviderErrors.MetaMaskFilSnapNotInstalledError
      ) {
        dispatch(
          metamaskConfigurationFail({
            extSupportsSnap: true,
            extInstalled: true,
            extUnlocked: true,
            snapInstalled: false
          })
        )
      } else {
        dispatch(metamaskConfigurationFail({}))
      }
    } else {
      if (err.code === -32603) {
        dispatch(
          metamaskConfigurationFail({
            extSupportsSnap: true,
            extInstalled: true,
            extUnlocked: true,
            snapEnabled: false,
            snapInstalled: true
          })
        )
        return
      }
      console.error(`UNHANDLED METAMASK ERROR: ${err.message}`)
      dispatch(metamaskConfigurationFail({}))
    }
  }
}
