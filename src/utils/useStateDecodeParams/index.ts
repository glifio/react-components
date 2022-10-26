import useSWRImmutable from 'swr/immutable'
import LotusRpcEngine from '@glif/filecoin-rpc-client'

import { useEnvironment } from '../../services/EnvironmentProvider'
import { isFilAddress } from '../isAddress'

interface UseStateDecodeParamsResult<T> {
  params: T | null
  loading: boolean
  error: Error | null
}

const fetcher = async <T>(
  apiAddress: string,
  lotusMethod: string,
  actorAddress: string,
  methodNum: number,
  base64Params: string
): Promise<T | null> => {
  if (!apiAddress || !actorAddress || !base64Params) return null

  if (!isFilAddress(actorAddress))
    throw new Error('Invalid actor address')

  // Temporarily attempt to parse as JSON string,
  // until StateDecodeParams is removed from graph
  try {
    return JSON.parse(base64Params)
  } catch {
    // params are not a JSON string
  }

  const lotusApi = new LotusRpcEngine({ apiAddress })
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
  const { lotusApiUrl } = useEnvironment()
  const { data, error } = useSWRImmutable<T, Error>(
    [lotusApiUrl, 'StateDecodeParams', address, method, params],
    fetcher
  )

  const loading = !!address && !!params && !data && !error

  return { params: data, loading, error }
}
