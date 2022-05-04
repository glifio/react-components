import { useCallback, useEffect, useRef, useState } from 'react'
import { Message } from '@glif/filecoin-message'
import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import Filecoin from '@glif/filecoin-wallet-provider'
import { GasParams } from '../customPropTypes'

interface UseGetGasParamsResult {
  gasParams: GasParams
  loading: boolean
  error: Error
}

export const useGetGasParams = (
  provider: Filecoin,
  message?: Message,
  maxFee?: FilecoinNumber
): UseGetGasParamsResult => {
  const [gasParams, setGasParams] = useState<GasParams | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Store gas params in a ref so we can check if they changed
  // in the useEffect hook below without causing an infinite loop
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
    setGasParams(null)
    setError(null)
    if (message) {
      setLoading(true)
      provider
        .gasEstimateMessageGas(
          message.toLotusType(),
          maxFee ? maxFee.toAttoFil() : undefined
        )
        .then((m: Message) => {
          const gasFeeCap = m.gasFeeCap.toFixed(0, BigNumber.ROUND_CEIL)
          const gasPremium = m.gasPremium.toFixed(0, BigNumber.ROUND_CEIL)
          const newGasParams = {
            gasFeeCap: new FilecoinNumber(gasFeeCap, 'attofil'),
            gasPremium: new FilecoinNumber(gasPremium, 'attofil'),
            gasLimit: new FilecoinNumber(m.gasLimit, 'attofil')
          }
          if (didUpdate(newGasParams)) setGasParams(newGasParams)
        })
        .catch((e: Error) => setError(e))
        .finally(() => setLoading(false))
    }
  }, [provider, message, maxFee, didUpdate])

  return { gasParams, loading, error }
}
