import { useEffect, useMemo, useState } from 'react'
import { LotusActorState } from '@glif/filecoin-actor-utils'
import { validateAddressString } from '@glif/filecoin-address'
import LotusRPCEngine from '@glif/filecoin-rpc-client'

import { useEnvironment } from '../../services/EnvironmentProvider'

interface UseStateReadStateResult<T> {
  data: LotusActorState<T> | null
  loading: boolean
  notFound: boolean
  error: Error | null
}

export const useStateReadState = <T = object | null>(
  address: string
): UseStateReadStateResult<T> => {
  const [data, setData] = useState<LotusActorState<T> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [notFound, setNotFound] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const { lotusApiUrl: apiAddress } = useEnvironment()

  const lotusRPC = useMemo(
    () =>
      new LotusRPCEngine({
        apiAddress
      }),
    [apiAddress]
  )

  useEffect(() => {
    setData(null)
    setNotFound(false)
    setError(null)
    if (!address) return
    if (validateAddressString(address)) {
      setLoading(true)
      lotusRPC
        .request<LotusActorState<T>>('StateReadState', address, null)
        .then((a: LotusActorState<T>) => setData(a))
        .catch((e: Error) => {
          e.message.includes('actor not found')
            ? setNotFound(true)
            : setError(e)
        })
        .finally(() => setLoading(false))
    } else {
      setError(new Error('Invalid address'))
    }
  }, [address, lotusRPC])

  return { data, loading, notFound, error }
}
