import useSWR, { SWRConfiguration } from 'swr'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { LotusActorState } from '@glif/filecoin-actor-utils'

import { useEnvironment } from '../../services/EnvironmentProvider'
import { isFilAddress } from '../isAddress'

interface UseStateReadStateResult<T> {
  data: LotusActorState<T> | null
  loading: boolean
  notFound: boolean
  error: Error | null
}

const fetcher = async <T>(
  apiAddress: string,
  lotusMethod: string,
  actorAddress: string
): Promise<LotusActorState<T> | null> => {
  if (!apiAddress || !actorAddress) return null

  if (!isFilAddress(actorAddress)) throw new Error('Invalid actor address')

  const lotusApi = new LotusRpcEngine({ apiAddress })
  return await lotusApi.request<LotusActorState<T>>(
    lotusMethod,
    actorAddress,
    null
  )
}

export const useStateReadState = <T = Record<string, any> | null>(
  address: string,
  swrConfig: SWRConfiguration = { refreshInterval: 10000 }
): UseStateReadStateResult<T> => {
  const { lotusApiUrl } = useEnvironment()
  const { data, error } = useSWR<LotusActorState<T>, Error>(
    [lotusApiUrl, 'StateReadState', address],
    fetcher,
    swrConfig
  )

  const loading = !!address && !data && !error
  const notFound = !!error && error.message.includes('actor not found')

  return { data, loading, notFound, error: notFound ? null : error }
}
