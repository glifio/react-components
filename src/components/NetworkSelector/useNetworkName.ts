import useSWR from 'swr'
import LotusRPCEngine from '@glif/filecoin-rpc-client'

export const useNetworkName = (lotusApiAddr: string) => {
  const { data: networkName = '', error = null } = useSWR(
    'StateNetworkName',
    async () => {
      const lCli = new LotusRPCEngine({
        apiAddress: lotusApiAddr
      })
      const network = (await lCli.request('StateNetworkName')) as string
      if (network)
        return (
          network.slice(0, 1).toUpperCase() + network.slice(1).toLowerCase()
        )

      throw new Error('Not connected to a network')
    }
  )

  return { networkName, error }
}
