import useSWRImmutable from 'swr/immutable'
import LotusRpcEngine from '@glif/filecoin-rpc-client'

import { useEnvironment } from '../../services/EnvironmentProvider'
import { isFilAddress, isDelegatedAddress } from '../isAddress'

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
  // Return null for missing input or delegated actors
  if (!apiAddress || !actorAddress || !base64Params) return null

  // Throw error for delegated actors
  if (isDelegatedAddress(actorAddress))
    throw new Error('Cannot decode parameters for delegated actors')

  // Throw error for invalid Filecoin address formats
  if (!isFilAddress(actorAddress)) throw new Error('Invalid actor address')

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
