import useSWR from 'swr'
import axios from 'axios'

enum NetworkStatus {
  PAUSED = 0,
  NOT_CHECKED = 1,
  SUCCESS = 2,
  SEEMS_DOWN = 8,
  DOWN = 9
}

export const useNetworkStatus = (statusApiAddr: string, apiKey: string) => {
  const { data: networkConnected = false, error = null } = useSWR(
    'networkStatus',
    async () => {
      const { data } = await axios.post<{
        stat: string
        pagination: object
        monitors: { status: NetworkStatus }[]
      }>(statusApiAddr, {
        api_key: apiKey,
        format: 'json',
        logs: 1
      })

      if (data.monitors[0].status !== NetworkStatus.SUCCESS) return false
      return true
    }
  )

  return { networkConnected, error }
}
