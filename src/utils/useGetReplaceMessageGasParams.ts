import { useEffect, useState } from 'react'
import { LotusMessage } from '@glif/filecoin-message'
import { FilecoinNumber } from '@glif/filecoin-number'
import Filecoin from '@glif/filecoin-wallet-provider'

interface ProviderGasParams {
  gasFeeCap: string
  gasPremium: string
  gasLimit: number
}

interface GasParams {
  gasFeeCap: FilecoinNumber
  gasPremium: FilecoinNumber
  gasLimit: FilecoinNumber
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
        .then((g: ProviderGasParams) =>
          setGasParams({
            gasFeeCap: new FilecoinNumber(g.gasFeeCap, 'attofil'),
            gasPremium: new FilecoinNumber(g.gasPremium, 'attofil'),
            gasLimit: new FilecoinNumber(g.gasLimit, 'attofil')
          })
        )
        .catch((e: Error) => setError(e))
        .finally(() => setLoading(false))
    }
  }, [provider, message, minimum])

  return { gasParams, loading, error }
}
