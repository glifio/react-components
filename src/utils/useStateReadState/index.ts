import { useEffect, useState } from 'react'
import { QueryHookOptions, useApolloClient } from '@apollo/client'
import type { CID } from '@glif/filecoin-wallet-provider'
import LotusRPCEngine from '@glif/filecoin-rpc-client'

import { Address, AddressDocument, AddressQuery } from '../../generated/graphql'
import { decodeActorCID } from '..'

const lCli = new LotusRPCEngine({
  apiAddress:
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC ||
    'https://api.calibration.node.glif.io'
})

export type LotusRPCActorState<T> = {
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

/////// implemented until https://github.com/glifio/graph/issues/33
export const useStateReadStateQuery = <T = any>(
  baseOptions: QueryHookOptions<
    T,
    {
      address: string
    }
  >
): { data: LotusRPCActorState<T>; error: Error; loading: boolean } => {
  const [actorState, setActorState] = useState<LotusRPCActorState<T> | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>(undefined)
  const [fetchedFor, setFetchedFor] = useState<string>('')
  const apolloClient = useApolloClient()

  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await lCli.request<LotusRPCActorState<any>>(
          'StateReadState',
          baseOptions.variables.address,
          null
        )

        if (res && decodeActorCID(res.Code).includes('multisig')) {
          res.State = res.State as MsigState<string>
          const signers = await Promise.all(
            res.State.Signers.map(async (id: string) => {
              const { data } = await apolloClient.query<AddressQuery>({
                query: AddressDocument,
                variables: {
                  address: id
                }
              })

              return { id, robust: data?.address?.robust || '' } as Address
            })
          )

          const availableBalance = await lCli.request<string>(
            'MsigGetAvailableBalance',
            baseOptions.variables.address,
            null
          )

          setActorState({
            ...res,
            State: {
              ...res.State,
              Signers: signers,
              AvailableBalance: availableBalance
            }
          })
        } else if (res) {
          setActorState({ ...res })
        }
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
    const newLoad = fetchedFor !== baseOptions?.variables?.address && !error

    if (firstLoad || newLoad) {
      setLoading(true)
      setFetchedFor(baseOptions?.variables?.address)
      fetchState()
    }
  }, [
    baseOptions?.variables?.address,
    loading,
    error,
    actorState,
    fetchedFor,
    setFetchedFor,
    apolloClient
  ])

  return { data: actorState, error, loading }
}
