import { useState } from 'react'
import { QueryHookOptions } from '@apollo/client'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { useEffect } from 'react'
import { Address } from '../../generated/graphql'
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
  NextTxnID: number
  NumApprovalsThreshold: number
  Signers: T[]
  StartEpoch: number
  UnlockDuration: number
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
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await lCli.request<LotusRPCActorState<any>>(
          'StateReadState',
          baseOptions.variables.address,
          null
        )

        if (res && decodeActorCID(res.Code['/']).includes('multisig')) {
          const signers = await Promise.all(
            (res.State as MsigState<string>).Signers.map(
              async (signer: string) => {
                const robust = await lCli.request<string>(
                  'StateAccountKey',
                  signer,
                  null
                )
                return { id: signer, robust } as Address
              }
            )
          )

          setActorState({
            ...res,
            State: {
              ...res.State,
              Signers: signers
            }
          })
        } else if (res) {
          setActorState({ ...res })
        }
      } catch (err) {
        if (err instanceof Error) setError(err)
        else setError(new Error('Failed to fetch'))
      } finally {
        setLoading(false)
      }
    }

    if (!actorState && loading && !error) {
      setLoading(true)
      fetchState()
    }
  }, [baseOptions.variables.address, loading, error, actorState])

  return { data: actorState, error, loading }
}
