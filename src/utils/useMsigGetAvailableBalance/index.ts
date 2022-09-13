import useSWR, { SWRConfiguration } from 'swr'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { FilecoinNumber } from '@glif/filecoin-number'
import { validateAddressString } from '@glif/filecoin-address'

import { useEnvironment } from '../../services/EnvironmentProvider'

interface UseMsigGetAvailableBalanceResult {
  availableBalance: FilecoinNumber | null
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
    await lotusApi.request<string>(lotusMethod, actorAddress, null),
    'attofil'
  )
}

export const useMsigGetAvailableBalance = (
  address: string,
  swrConfig: SWRConfiguration = { refreshInterval: 10000 }
): UseMsigGetAvailableBalanceResult => {
  const { lotusApi } = useEnvironment()
  const { data, error } = useSWR<FilecoinNumber, Error>(
    [lotusApi, 'MsigGetAvailableBalance', address],
    fetcher,
    swrConfig
  )

  const loading = !!address && !data && !error

  return { availableBalance: data, loading, error }
}
