import { useEffect, useState } from 'react'
import { LotusMessage, Message } from '@glif/filecoin-message'
import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import Filecoin from '@glif/filecoin-wallet-provider'

interface GasParams {
  gasFeeCap: FilecoinNumber
  gasPremium: FilecoinNumber
  gasLimit: FilecoinNumber
}

interface UseGetGasParamsResult {
  gasParams: GasParams
  loading: boolean
  error: Error
}

export const useGetGasParams = (
  provider: Filecoin,
  message?: LotusMessage
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
        .gasEstimateMessageGas(message)
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
  }, [provider, message])

  return { gasParams, loading, error }
}
