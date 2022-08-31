import { useEffect, useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import { validateAddressString } from '@glif/filecoin-address'

import { useEnvironment } from '../../services/EnvironmentProvider'

interface UseMsigGetAvailableBalanceResult {
  availableBalance: FilecoinNumber | null
  loading: boolean
  error: Error | null
}

export const useMsigGetAvailableBalance = (
  address: string
): UseMsigGetAvailableBalanceResult => {
  const [balance, setBalance] = useState<FilecoinNumber | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const { lotusApi } = useEnvironment()

  useEffect(() => {
    setBalance(null)
    setError(null)
    if (!address) return
    if (validateAddressString(address)) {
      setLoading(true)
      lotusApi
        .request<string>('MsigGetAvailableBalance', address, null)
        .then((b: string) => setBalance(new FilecoinNumber(b, 'attofil')))
        .catch((e: Error) => setError(e))
        .finally(() => setLoading(false))
    } else {
      setError(new Error('Invalid address'))
    }
  }, [address, lotusApi])

  return { availableBalance: balance, loading, error }
}
