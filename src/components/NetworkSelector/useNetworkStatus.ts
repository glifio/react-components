import useSWR from 'swr'
import axios from 'axios'

enum NetworkStatus {
  PAUSED = 0,
  NOT_CHECKED = 1,
  SUCCESS = 2,
  SEEMS_DOWN = 8,
  DOWN = 9
}

interface NetworkStatusResponse {
  stat: string
  pagination: object
  monitors: { status: NetworkStatus }[]
}

export const useNetworkStatus = (statusApiAddr: string, apiKey: string) => {
  const fetcher = async (
    url: string,
    key: string
  ): Promise<NetworkStatusResponse> =>
    (
      await axios.post<NetworkStatusResponse>(url, {
        api_key: key,
        format: 'json',
        logs: 1
      })
    ).data

  const { data, error } = useSWR<NetworkStatusResponse, Error>(
    [statusApiAddr, apiKey],
    fetcher
  )

  return {
    networkConnected: data?.monitors[0].status === NetworkStatus.SUCCESS,
    loading: !data && !error,
    error
  }
}
