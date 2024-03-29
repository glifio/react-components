import useSWR, { SWRConfiguration } from 'swr'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { FilecoinNumber } from '@glif/filecoin-number'

import { useEnvironment } from '../../services/EnvironmentProvider'
import { isFilAddress } from '../isAddress'

interface UseMsigGetAvailableBalanceResult {
  availableBalance: FilecoinNumber | null
  loading: boolean
  error: Error | null
}

const fetcher = async (
  apiAddress: string,
  lotusMethod: string,
  actorAddress: string
): Promise<FilecoinNumber | null> => {
  if (!apiAddress || !actorAddress) return null

  if (!isFilAddress(actorAddress)) throw new Error('Invalid actor address')

  const lotusApi = new LotusRpcEngine({ apiAddress })
  return new FilecoinNumber(
    await lotusApi.request<string>(lotusMethod, actorAddress, null),
    'attofil'
  )
}

export const useMsigGetAvailableBalance = (
  address: string,
  swrConfig: SWRConfiguration = { refreshInterval: 10000 }
): UseMsigGetAvailableBalanceResult => {
  const { lotusApiUrl } = useEnvironment()
  const { data, error } = useSWR<FilecoinNumber, Error>(
    [lotusApiUrl, 'MsigGetAvailableBalance', address],
    fetcher,
    swrConfig
  )

  const loading = !!address && !data && !error

  return { availableBalance: data, loading, error }
}
