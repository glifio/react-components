import useSWRImmutable from 'swr/immutable'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { useEnvironment } from '../../services/EnvironmentProvider'

interface UseNetworkNameResult {
  networkName: string
  loading: boolean
  error: Error | null
}

const fetcher = async (
  apiAddress: string,
  lotusMethod: string
): Promise<string> => {
  if (!apiAddress) return null
  const lotusApi = new LotusRpcEngine({ apiAddress })
  return await lotusApi.request<string>(lotusMethod)
}

export const useNetworkName = (): UseNetworkNameResult => {
  const { lotusApiUrl } = useEnvironment()
  const { data, error } = useSWRImmutable<string, Error>(
    [lotusApiUrl, 'StateNetworkName'],
    fetcher
  )

  return { networkName: data ?? '', loading: !data && !error, error }
}
