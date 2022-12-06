import useSWRImmutable from 'swr/immutable'
import LotusRpcEngine from '@glif/filecoin-rpc-client'
import { ethAddressFromDelegated } from '@glif/filecoin-address'

import { useEnvironment } from '../../services/EnvironmentProvider'
import { isEthAddress, isDelegatedAddress } from '../isAddress'

const fetcher = async (
  apiAddress: string,
  lotusMethod: string,
  actorAddress: string
): Promise<number | null> => {
  if (!apiAddress || !actorAddress) return null

  const addressToFetch = isEthAddress(actorAddress)
    ? actorAddress
    : isDelegatedAddress(actorAddress)
    ? ethAddressFromDelegated(actorAddress)
    : null

  if (!addressToFetch) throw new Error('Invalid FEVM actor address')

  const lotusApi = new LotusRpcEngine({
    apiAddress,
    namespace: 'eth',
    delimeter: '_'
  })
  return await lotusApi.request<number>(lotusMethod, addressToFetch, 'latest')
}

// Given an address, return true if this represents an FEVM actor
// TODO: We should just be able to match the actor's Code with the actorCode
export const useIsFEVMActor = (address: string): boolean => {
  const { lotusApiUrl } = useEnvironment()

  // Get the bytecode associated with this address
  const { data } = useSWRImmutable<number, Error>(
    [lotusApiUrl, 'getCode', address],
    fetcher
  )

  // If the bytecode exists, this is a smart contract
  return !!data
}
