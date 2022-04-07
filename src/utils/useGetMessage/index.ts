import { useEffect, useState } from 'react'
import { LotusMessage } from '@glif/filecoin-message'
import LotusRPCEngine from '@glif/filecoin-rpc-client'

import { validateCID } from '../validateCID'

const lotusRPC = new LotusRPCEngine({
  apiAddress:
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC ||
    'https://calibration.node.glif.io'
})

interface UseGetMessageResult {
  message: LotusMessage
  loading: boolean
  error: Error
}

export const useGetMessage = (cid: string): UseGetMessageResult => {
  const [message, setMessage] = useState<LotusMessage | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setMessage(null)
    setError(null)
    if (validateCID(cid)) {
      setLoading(true)
      lotusRPC
        .request('ChainGetMessage', { '/': cid })
        .then((m: LotusMessage) => setMessage(m))
        .catch((e: Error) => setError(e))
        .finally(() => setLoading(false))
    } else {
      setError(new Error('Invalid CID'))
    }
  }, [cid])

  return { message, loading, error }
}
