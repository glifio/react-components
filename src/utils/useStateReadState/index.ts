import { useEffect, useState } from 'react'
import type { CID } from '@glif/filecoin-wallet-provider'
import LotusRPCEngine from '@glif/filecoin-rpc-client'

import { Address } from '../../generated/graphql'
import { useEnvironment } from '../../services/EnvironmentProvider'

export type LotusRPCActorState<T = object | null> = {
  Balance: string
  Code: CID
  State: T
}

export type MsigState<T = Address> = {
  InitialBalance: string
  AvailableBalance: string
  NextTxnID: number
  NumApprovalsThreshold: number
  Signers: T[]
  StartEpoch: number
  UnlockDuration: number
}

const emptyActorState: LotusRPCActorState<any> = {
  Balance: '0',
  Code: { '/': '' },
  State: null
}

interface UseStateReadStateResult<T> {
  data: LotusRPCActorState<T> | null
  loading: boolean
  error: Error | null
}

/////// implemented until https://github.com/glifio/graph/issues/33
export const useStateReadState = <T = object | null>(
  address: string
): UseStateReadStateResult<T> => {
  const { lotusApiUrl: apiAddress, networkName } = useEnvironment()
  const [actorState, setActorState] = useState<LotusRPCActorState<T> | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>(undefined)
  const [fetchedFor, setFetchedFor] = useState<string>('')

  useEffect(() => {
    const fetchState = async () => {
      try {
        const lCli = new LotusRPCEngine({
          apiAddress
        })
        const res = await lCli.request<LotusRPCActorState<any>>(
          'StateReadState',
          address,
          null
        )
        setActorState({ ...res })
      } catch (err) {
        if (err instanceof Error) {
          if (err.message.includes('actor not found')) {
            setActorState({ ...emptyActorState })
          } else setError(err)
        } else setError(new Error('Failed to fetch'))
      } finally {
        setLoading(false)
      }
    }

    const firstLoad = !actorState && loading && !error
    const newLoad = fetchedFor !== address && !error

    if (firstLoad || newLoad) {
      setLoading(true)
      setFetchedFor(address)
      fetchState()
    }
  }, [
    address,
    loading,
    error,
    actorState,
    fetchedFor,
    setFetchedFor,
    apiAddress,
    networkName
  ])

  return { data: actorState, error, loading }
}
