import useSWR from 'swr'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { useEnvironment } from '../../services/EnvironmentProvider'

interface UseNetworkNameResult {
  networkName: string
  loading: boolean
  error: Error | null
}

const fetcher = async (
  lotusApi: LotusRpcEngine,
  lotusMethod: string
): Promise<string> => await lotusApi.request<string>(lotusMethod)

export const useNetworkName = (): UseNetworkNameResult => {
  const { lotusApi } = useEnvironment()
  const { data, error } = useSWR<string, Error>(
    [lotusApi, 'StateNetworkName'],
    fetcher
  )

  return { networkName: data ?? '', loading: !data && !error, error }
}
