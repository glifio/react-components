import {
  getActorName,
  getMethodName,
  getFEVMMethodName
} from '@glif/filecoin-actor-utils'

import { Address, useActorQuery } from '../../../../generated/graphql'
import { isDelegatedAddress, convertAddrToPrefix } from '../../../../utils'
import { useAbi, useEnvironment, useLogger } from '../../../../services'

export const useMethodName = (
  address: Address,
  method: number,
  params: string
): string | null => {
  const logger = useLogger()
  const { coinType, networkName } = useEnvironment()

  // Get actor data from GraphQL
  const { data } = useActorQuery({
    variables: {
      address: convertAddrToPrefix(address?.robust || address?.id, coinType)
    },
    skip: !address
  })

  try {
    const [abi] = useAbi(address?.robust)
    if (isDelegatedAddress(address?.robust) && !!abi) {
      return getFEVMMethodName(params, abi)
    } else if (isDelegatedAddress(address?.robust)) {
      return 'Unknown'
    }

    // Resolve actor code, name and message name
    const actorCode = data?.actor?.Code
    const actorName = actorCode ? getActorName(actorCode, networkName) : null
    return actorName ? getMethodName(actorName, method) : null
  } catch (err) {
    logger.error(err)
    return 'Unknown'
  }
}
