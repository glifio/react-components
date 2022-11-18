import { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { RawFEVMLog } from '@glif/filecoin-actor-utils'

import { useEnvironment } from '../services/EnvironmentProvider'

interface UseChainGetMsgEventsReturn {
  logs: RawFEVMLog[] | null
  loading: boolean
  error: Error | null
}

const fetcher = async (
  apiAddress: string,
  lotusMethod: string,
  txID: string
): Promise<RawFEVMLog[] | null> => {
  if (!apiAddress || !txID) return null

  const lotusApi = new LotusRpcEngine({
    apiAddress,
    namespace: 'eth',
    delimeter: '_'
  })
  const tx = await lotusApi.request(lotusMethod, txID)
  return tx.logs as Array<RawFEVMLog>
}

export const useChainGetMsgEvents = (
  txID: string,
  swrConfig: SWRConfiguration = { refreshInterval: 10000 }
): UseChainGetMsgEventsReturn => {
  const { lotusApiUrl } = useEnvironment()
  const { data: logData, error } = useSWRImmutable<RawFEVMLog[], Error>(
    [lotusApiUrl, 'getTransactionReceipt', txID],
    fetcher,
    swrConfig
  )

  if (txID && !logData && !error) return { logs: null, loading: false, error }

  return { logs: logData, loading: false, error }
}
