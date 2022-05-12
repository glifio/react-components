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
          setGasParams({
            gasFeeCap: new FilecoinNumber(gasFeeCap, 'attofil'),
            gasPremium: new FilecoinNumber(gasPremium, 'attofil'),
            gasLimit: new FilecoinNumber(m.gasLimit, 'attofil')
          })
        })
        .catch((e: Error) => setError(e))
        .finally(() => setLoading(false))
    }
  }, [provider, message, maxFee])

  return { gasParams, loading, error }
}
