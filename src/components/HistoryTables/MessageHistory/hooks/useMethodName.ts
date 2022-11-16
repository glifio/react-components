import {
  getActorName,
  getMethodName,
  getFEVMMethodName
} from '@glif/filecoin-actor-utils'

import { Address, useActorQuery } from '../../../../generated/graphql'
import convertAddrToPrefix from '../../../../utils/convertAddrToPrefix'
import { isDelegatedAddress } from '../../../../utils/isAddress'
import { useEnvironment } from '../../../../services/EnvironmentProvider'
import { useAbi } from '../../../../utils/useAbi'

export const useMethodName = (
  address: Address,
  method: number,
  params: string
): string => {
  const { coinType, networkName } = useEnvironment()
  const { abi } = useAbi(address?.robust)
  const isDelegated = isDelegatedAddress(address?.robust)
  const defaultName = 'Unknown'

  // Get actor data from GraphQL
  const { data } = useActorQuery({
    variables: {
      address: convertAddrToPrefix(address?.robust || address?.id, coinType)
    },
    skip: !address || isDelegated
  })

  // Resolve method name from actor ABI
  if (isDelegated) return getFEVMMethodName(params, abi) || defaultName

  // Resolve method name from actor code
  const actorCode = data?.actor?.Code
  const actorName = actorCode ? getActorName(actorCode, networkName) : null
  const methodName = actorName ? getMethodName(actorName, method) : null
  return methodName || defaultName
}
