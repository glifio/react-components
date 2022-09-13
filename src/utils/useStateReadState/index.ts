import useSWR, { SWRConfiguration } from 'swr'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { LotusActorState } from '@glif/filecoin-actor-utils'
import { validateAddressString } from '@glif/filecoin-address'

import { useEnvironment } from '../../services/EnvironmentProvider'

interface UseStateReadStateResult<T> {
  data: LotusActorState<T> | null
  loading: boolean
  notFound: boolean
  error: Error | null
}

export const useStateReadState = <T = object | null>(
  address: string,
  swrConfig: SWRConfiguration = { refreshInterval: 10000 }
): UseStateReadStateResult<T> => {
  const fetcher = async (
    lotusApi: LotusRpcEngine,
    lotusMethod: string,
    actorAddress: string
  ): Promise<LotusActorState<T> | null> => {
    if (!actorAddress) return null

    if (!validateAddressString(actorAddress))
      throw new Error('Invalid actor address')

    return await lotusApi.request<LotusActorState<T>>(
      lotusMethod,
      actorAddress,
      null
    )
  }

  const { lotusApi } = useEnvironment()
  const { data, error } = useSWR<LotusActorState<T>, Error>(
    [lotusApi, 'StateReadState', address],
    fetcher,
    swrConfig
  )

  const loading = !!address && !data && !error
  const notFound = !!error && error.message.includes('actor not found')

  return { data, loading, notFound, error: notFound ? null : error }
}
