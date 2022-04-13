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
  message?: LotusMessage,
  minimum?: boolean
): UseGetReplaceMessageGasParamsResult => {
  const [gasParams, setGasParams] = useState<GasParams | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const getGasParams = minimum
      ? provider.getReplaceMessageMinGasParams
      : provider.getReplaceMessageGasParams
    setGasParams(null)
    setError(null)
    if (message) {
      setLoading(true)
      getGasParams(message)
        .then((g: GasParams) => setGasParams(g))
        .catch((e: Error) => setError(e))
        .finally(() => setLoading(false))
    }
  }, [provider, message, minimum])

  return { gasParams, loading, error }
}
