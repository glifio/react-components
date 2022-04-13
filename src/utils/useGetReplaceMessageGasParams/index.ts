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
  const resolver = minimum
    ? provider.getReplaceMessageMinGasParams
    : provider.getReplaceMessageGasParams;

  useEffect(() => {
    setGasParams(null)
    setError(null)
    if (message) {
      setLoading(true)
      resolver(message)
        .then((g: GasParams) => setGasParams(g))
        .catch((e: Error) => setError(e))
        .finally(() => setLoading(false))
    }
  }, [provider, message])

  return { gasParams, loading, error }
}
