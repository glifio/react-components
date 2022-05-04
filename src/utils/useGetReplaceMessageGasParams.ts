import { useCallback, useEffect, useRef, useState } from 'react'
import { Message } from '@glif/filecoin-message'
import { FilecoinNumber } from '@glif/filecoin-number'
import Filecoin from '@glif/filecoin-wallet-provider'
import { GasParams } from '../customPropTypes'

interface ProviderGasParams {
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
  message?: Message,
  minimum?: boolean
): UseGetReplaceMessageGasParamsResult => {
  const [gasParams, setGasParams] = useState<GasParams | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Store gas params in a ref so we can check if they changed in the 
  // useEffect hook below without adding gasParams to the dependencies,
  // which would cause useEffect to rerun after calling setGasParams.
  const gasParamsRef = useRef<GasParams | null>(null)
  const didUpdate = useCallback((params: GasParams) => {
    const update: boolean =
      !gasParamsRef.current ||
      !gasParamsRef.current.gasFeeCap.isEqualTo(params.gasFeeCap) ||
      !gasParamsRef.current.gasPremium.isEqualTo(params.gasPremium) ||
      !gasParamsRef.current.gasLimit.isEqualTo(params.gasLimit)
    if (update) gasParamsRef.current = params
    return update
  }, [])

  useEffect(() => {
    const getGasParams = minimum
      ? provider.getReplaceMessageMinGasParams
      : provider.getReplaceMessageGasParams
    setGasParams(null)
    setError(null)
    if (message) {
      setLoading(true)
      getGasParams(message.toLotusType())
        .then((g: ProviderGasParams) => {
          const newGasParams = {
            gasFeeCap: new FilecoinNumber(g.gasFeeCap, 'attofil'),
            gasPremium: new FilecoinNumber(g.gasPremium, 'attofil'),
            gasLimit: new FilecoinNumber(g.gasLimit, 'attofil')
          }
          if (didUpdate(newGasParams)) setGasParams(newGasParams)
        })
        .catch((e: Error) => setError(e))
        .finally(() => setLoading(false))
    }
  }, [provider, message, minimum, didUpdate])

  return { gasParams, loading, error }
}
