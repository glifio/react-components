import {
  getActorName,
  getMethodName,
  getFEVMMethodName
} from '@glif/filecoin-actor-utils'

import { Address, useActorQuery } from '../../../../generated/graphql'
import convertAddrToPrefix from '../../../../utils/convertAddrToPrefix'
import { useEnvironment } from '../../../../services/EnvironmentProvider'
import { isDelegatedAddress, useAbi } from '../../../../utils'

export const useMethodName = (
  address: Address,
  method: number,
  params: string
): string | null => {
  const { coinType, networkName } = useEnvironment()

  // Get actor data from GraphQL
  const { data } = useActorQuery({
    variables: {
      address: convertAddrToPrefix(address?.robust || address?.id, coinType)
    },
    skip: !address
  })

  const [abi] = useAbi(address.robust)
  if (!!address && isDelegatedAddress(address?.robust) && !!abi) {
    return getFEVMMethodName(params, abi)
  }

  // Resolve actor code, name and message name
  const actorCode = data?.actor?.Code
  const actorName = actorCode ? getActorName(actorCode, networkName) : null
  return actorName ? getMethodName(actorName, method) : null
}
