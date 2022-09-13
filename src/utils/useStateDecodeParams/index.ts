import useSWR from 'swr'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { validateAddressString } from '@glif/filecoin-address'

import { useEnvironment } from '../../services/EnvironmentProvider'

interface UseStateDecodeParamsResult<T> {
  params: T | null
  loading: boolean
  error: Error | null
}

const fetcher = async <T>(
  lotusApi: LotusRpcEngine,
  lotusMethod: string,
  actorAddress: string,
  methodNum: number,
  base64Params: string
): Promise<T | null> => {
  if (!actorAddress || !base64Params) return null

  if (!validateAddressString(actorAddress))
    throw new Error('Invalid actor address')

  return await lotusApi.request<T>(
    lotusMethod,
    actorAddress,
    methodNum,
    base64Params,
    null
  )
}

export const useStateDecodeParams = <T = Record<string, any> | null>(
  address: string,
  method: number,
  params: string
): UseStateDecodeParamsResult<T> => {
  const { lotusApi } = useEnvironment()
  const { data, error } = useSWR<T, Error>(
    [lotusApi, 'StateDecodeParams', address, method, params],
    fetcher
  )

  const loading = !!address && !!params && !data && !error

  return { params: data, loading, error }
}
