import { useCallback } from 'react'
import { useWallet } from '../WalletProvider/useWallet'
import { FilecoinNumber } from '@glif/filecoin-number'
import useSWR, { SWRConfiguration } from 'swr'

import { useWalletProvider } from '../WalletProvider'
import { useEnvironment, useLogger } from '../EnvironmentProvider'

export const useBalancePoller = (
  swrOptions: SWRConfiguration = { refreshInterval: 10000 }
) => {
  const { lotusApi } = useEnvironment()
  const { selectedWalletIdx, updateBalance } = useWalletProvider()
  const wallet = useWallet()
  const logger = useLogger()
  const fetcher = useCallback(
    async (address: string, prevBalance: FilecoinNumber, walletIdx: number) => {
      try {
        const latestBalance = new FilecoinNumber(
          await lotusApi.request<string>('WalletBalance', address),
          'attofil'
        )
        if (!latestBalance.isEqualTo(prevBalance)) {
          updateBalance(latestBalance, walletIdx)
        }

        return latestBalance
      } catch (err) {
        logger.error(
          err instanceof Error ? err.message : 'Error fetching balance',
          'useBalancePoller'
        )
      }
    },
    [updateBalance, lotusApi, logger]
  )

  const { data } = useSWR(
    wallet.address ? [wallet.address, wallet.balance, selectedWalletIdx] : null,
    fetcher,
    swrOptions
  )

  return data
}

// Polls lotus for up to date balances about the user's selected wallet
export function BalancePoller({
  swrOptions
}: {
  swrOptions?: SWRConfiguration
}) {
  useBalancePoller(swrOptions)

  return null
}
