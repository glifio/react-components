import { useEffect, useMemo, useState } from 'react'
import { Message, LotusMessage } from '@glif/filecoin-message'
import LotusRPCEngine from '@glif/filecoin-rpc-client'

import { validateCID } from './validateCID'
import { useEnvironment } from '../services/EnvironmentProvider'

interface UseGetMessageResult {
  message: Message
  loading: boolean
  error: Error
}

export const useGetMessage = (cid: string): UseGetMessageResult => {
  const [message, setMessage] = useState<Message | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
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
    setMessage(null)
    setError(null)
    if (validateCID(cid)) {
      setLoading(true)
      lotusRPC
        .request<LotusMessage>('ChainGetMessage', { '/': cid })
        .then((m: LotusMessage) => setMessage(Message.fromLotusType(m)))
        .catch((e: Error) => setError(e))
        .finally(() => setLoading(false))
    } else {
      setError(new Error('Invalid CID'))
    }
  }, [cid, lotusRPC])

  return { message, loading, error }
}
