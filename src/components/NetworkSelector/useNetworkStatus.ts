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

interface UseNetworkStatusResult {
  networkConnected: boolean
  loading: boolean
  error: Error | null
}

const fetcher = async (url: string): Promise<NetworkStatusResponse> =>
  (await axios.get<NetworkStatusResponse>(url)).data

export const useNetworkStatus = (url: string): UseNetworkStatusResult => {
  const { data, error } = useSWR<NetworkStatusResponse, Error>(url, fetcher)

  return {
    networkConnected: data?.monitors[0].status === NetworkStatus.SUCCESS,
    loading: !data && !error,
    error
  }
}
