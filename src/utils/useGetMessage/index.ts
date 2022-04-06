import { useEffect, useState } from 'react'
import { LotusMessage } from '@glif/filecoin-message'
import LotusRPCEngine from '@glif/filecoin-rpc-client'

import { logger } from '../../logger'

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
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setMessage(null)
    setLoading(true)
    setError(null)
    lotusRPC
      .request('ChainGetMessage', { '/': cid })
      .then((m: LotusMessage) => {
        setLoading(false)
        setMessage(m)
        logger.info(m)
      })
      .catch((e: Error) => {
        setLoading(false)
        setError(e)
        logger.error(e)
      })
  }, [cid])

  return { message, loading, error }
}
