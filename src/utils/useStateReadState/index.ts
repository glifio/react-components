import { useState } from 'react'
import { QueryHookOptions } from '@apollo/client'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { useEffect } from 'react'
import { Address } from '../../generated/graphql'

const lCli = new LotusRPCEngine({
  apiAddress:
    process.env.LOTUS_NODE_JSONRPC || 'https://calibration.node.glif.io'
})

type CID = {
  '/': string
}

type MsigState<T = Address> = {
  Balance: string
  Code: CID
  State: {
    InitialBalance: string
    NextTxnID: number
    NumApprovalsThreshold: number
    Signers: T[]
    StartEpoch: number
    UnlockDuration: number
  }
}

/////// implemented until https://github.com/glifio/graph/issues/33
export const useStateReadStateQuery = (
  baseOptions: QueryHookOptions<
    MsigState<Address>,
    {
      address: string
    }
  >
): { data: MsigState<Address>; error: Error; loading: boolean } => {
  const [actorState, setActorState] = useState<MsigState<Address> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>(undefined)
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await lCli.request<MsigState<string>>(
          'StateReadState',
          baseOptions.variables.address,
          null
        )

        if (res) {
          const signers = await Promise.all(
            res.State.Signers.map(async (signer: string) => {
              const robust = await lCli.request<string>(
                'StateAccountKey',
                signer,
                null
              )
              return { id: signer, robust } as Address
            })
          )

          setActorState({ ...res, State: { ...res.State, Signers: signers } })
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
