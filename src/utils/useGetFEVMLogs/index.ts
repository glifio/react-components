import useSWRImmutable from 'swr/immutable'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { FEVMLog } from '@glif/filecoin-actor-utils'

import { useEnvironment } from '../../services/EnvironmentProvider'

interface UseGetFEVMLogsResult {
  logs: FEVMLog[] | null
  loading: boolean
  error: Error | null
}

const fetcher = async (
  apiAddress: string,
  lotusMethod: string,
  txHash: string
): Promise<FEVMLog[] | null> => {
  // Return null for missing input
  if (!apiAddress || !txHash) return null

  const lotusApi = new LotusRpcEngine({
    apiAddress,
    namespace: 'eth',
    delimeter: '_'
  })
  const txReceipt = await lotusApi.request<{ logs: FEVMLog[] }>(
    lotusMethod,
    txHash
  )
  return txReceipt.logs
}

export const useGetFEVMLogs = (txHash: string): UseGetFEVMLogsResult => {
  const { lotusApiUrl } = useEnvironment()
  const { data, error } = useSWRImmutable<FEVMLog[], Error>(
    [lotusApiUrl, 'getTransactionReceipt', txHash],
    fetcher
  )

  const loading = !!txHash && !data && !error

  return { logs: data, loading, error }
}
