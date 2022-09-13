import useSWR, { SWRConfiguration } from 'swr'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { useWallet } from '../WalletProvider/useWallet'
import { FilecoinNumber } from '@glif/filecoin-number'
import { validateAddressString } from '@glif/filecoin-address'

import { useWalletProvider } from '../WalletProvider'
import { useEnvironment, useLogger } from '../EnvironmentProvider'

interface UseBalancePollerResult {
  balance: FilecoinNumber | null
  loading: boolean
  error: Error | null
}

const fetcher = async (
  lotusApi: LotusRpcEngine,
  lotusMethod: string,
  actorAddress: string
): Promise<FilecoinNumber | null> => {
  if (!actorAddress) return null

  if (!validateAddressString(actorAddress))
    throw new Error('Invalid actor address')

  return new FilecoinNumber(
    await lotusApi.request<string>(lotusMethod, actorAddress),
    'attofil'
  )
}

export const useBalancePoller = (
  swrConfig: SWRConfiguration = { refreshInterval: 10000 }
): UseBalancePollerResult => {
  const wallet = useWallet()
  const logger = useLogger()
  const { lotusApi } = useEnvironment()
  const { selectedWalletIdx, updateBalance } = useWalletProvider()
  const { data, error } = useSWR<FilecoinNumber, Error>(
    [lotusApi, 'WalletBalance', wallet.address],
    fetcher,
    swrConfig
  )

  if (data && !data.isEqualTo(wallet.balance)) {
    updateBalance(data, selectedWalletIdx)
  }

  if (error) logger.error(error)
  
  const loading = !!wallet.address && !data && !error

  return { balance: data, loading, error }
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
