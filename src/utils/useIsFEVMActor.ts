import {
  decode,
  ethAddressFromDelegated,
  Protocol
} from '@glif/filecoin-address'
import useSWRImmutable from 'swr/immutable'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { useEnvironment } from '../services/EnvironmentProvider'
import { isEthAddress } from './isAddress'

const fetcher = async (
  apiAddress: string,
  lotusMethod: string,
  address: string,
  latest: string
): Promise<any> => {
  if (!apiAddress || !address) {
    return false
  } else if (
    !isEthAddress(address) &&
    decode(address).protocol() !== Protocol.DELEGATED
  ) {
    return false
  }

  let addrToFetch
  try {
    addrToFetch = ethAddressFromDelegated(address)
  } catch {
    addrToFetch = address
  }

  const lotusApi = new LotusRpcEngine({
    apiAddress,
    namespace: 'eth',
    delimeter: '_'
  })

  // get the bytecode associated with this eth addr
  const code = await lotusApi.request(lotusMethod, addrToFetch, latest)
  // if bytecode exists, this is a smart contract
  return code !== 0x00
}

// given an address, return true if this represents an FEVM actor
// TODO: we should just be able to match the actor's Code with the actorCode
export const useIsFEVMActor = (address: string): boolean => {
  const { lotusApiUrl } = useEnvironment()
  const { data } = useSWRImmutable<boolean, Error>(
    [lotusApiUrl, 'getCode', address, 'latest'],
    fetcher
  )

  return data || false
}
