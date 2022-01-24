import { useState } from 'react'
import { QueryHookOptions } from '@apollo/client'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { useEffect } from 'react'

const lCli = new LotusRPCEngine({
  apiAddress:
    process.env.LOTUS_NODE_JSONRPC || 'https://calibration.node.glif.io'
})

type MsigState = {
  Balance: string
  State: {
    InitialBalance: string
    NextTxnID: number
    NumApprovalsThreshold: number
    Signers: string[]
    StartEpoch: number
    UnlockDuration: number
  }
}

/////// implemented until https://github.com/glifio/graph/issues/33
export const useStateReadStateQuery = (
  baseOptions: QueryHookOptions<
    MsigState,
    {
      address: string
    }
  >
): { data: MsigState; error: Error; loading: boolean } => {
  const [actorState, setActorState] = useState<MsigState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>(undefined)
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await lCli.request<MsigState>(
          'StateReadState',
          baseOptions.variables.address,
          null
        )
        setActorState(res)
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
