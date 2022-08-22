import useSWR from 'swr'
import LotusRPCEngine from '@glif/filecoin-rpc-client'

const fetcher = async (lotusApiAddr: string) => {
  const lCli = new LotusRPCEngine({
    apiAddress: lotusApiAddr
  })
  const network = (await lCli.request('StateNetworkName')) as string
  if (network) return network

  throw new Error('Not connected to a network')
}

export const useNetworkName = (lotusApiAddr: string) => {
  const {
    data: networkName = '',
    error = null,
    isValidating
  } = useSWR(lotusApiAddr, fetcher)

  return { networkName, error, loading: isValidating }
}
