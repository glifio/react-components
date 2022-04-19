import { useEffect, useState } from 'react'
import { QueryHookOptions } from '@apollo/client'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { Address, useAddressLazyQuery } from '../../generated/graphql'
import { decodeActorCID } from '..'

const lCli = new LotusRPCEngine({
  apiAddress:
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC ||
    'https://calibration.node.glif.io'
})

type CID = {
  '/': string
}

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
  const [getAddress] = useAddressLazyQuery()

  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await lCli.request<LotusRPCActorState<any>>(
          'StateReadState',
          baseOptions.variables.address,
          null
        )

        if (res && decodeActorCID(res.Code['/']).includes('multisig')) {
          res.State = res.State as MsigState<string>
          const signers = await Promise.all(
            res.State.Signers.map(async (signer: string) => {
              const {
                error: addressLookupErr,
                loading: addressLookupLoading,
                data
              } = await getAddress({
                variables: {
                  address: signer
                }
              })

              if (
                !addressLookupErr &&
                !addressLookupLoading &&
                !!data?.address
              ) {
                return data.address
              }

              return { id: signer, robust: '' } as Address
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
    getAddress
  ])

  return { data: actorState, error, loading }
}
