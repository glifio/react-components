import { useEffect, useState } from 'react'
import { LotusMessage } from '@glif/filecoin-message'
import Filecoin from '@glif/filecoin-wallet-provider'

interface GasParams {
  gasFeeCap: string
  gasPremium: string
  gasLimit: number
}

interface UseGetReplaceMessageGasParamsResult {
  gasParams: GasParams
  loading: boolean
  error: Error
}

export const useGetReplaceMessageGasParams = (
  provider: Filecoin,
  message?: LotusMessage
): UseGetReplaceMessageGasParamsResult => {
  const [gasParams, setGasParams] = useState<GasParams | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setGasParams(null)
    setError(null)
    if (message) {
      setLoading(true)
      provider
        .getReplaceMessageGasParams(message)
        .then((g: GasParams) => setGasParams(g))
        .catch((e: Error) => setError(e))
        .finally(() => setLoading(false))
    }
  }, [provider, message])

  return { gasParams, loading, error }
}
