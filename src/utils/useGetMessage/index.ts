import { useEffect, useState } from 'react'
import { LotusMessage } from '@glif/filecoin-message'
import LotusRPCEngine from '@glif/filecoin-rpc-client'

import { validateCID } from '../validateCID'
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
    if (validateCID(cid)) {
      lotusRPC
        .request('ChainGetMessage', { '/': cid })
        .then((m: LotusMessage) => {
          setLoading(false)
          setMessage(m)
          logger.info(m)
        })
        .catch((e: Error) => {
          logger.error(e)
          setLoading(false)
          setError(e)
        })
    } else {
      const e = new Error('Invalid CID')
      logger.error(e)
      setError(e)
    }
  }, [cid])

  return { message, loading, error }
}
