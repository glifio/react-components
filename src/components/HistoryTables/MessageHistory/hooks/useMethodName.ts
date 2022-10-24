import { getActorName, getMethodName } from '@glif/filecoin-actor-utils'

import { Address, useActorQuery } from '../../../../generated/graphql'
import convertAddrToPrefix from '../../../../utils/convertAddrToPrefix'
import { useEnvironment } from '../../../../services/EnvironmentProvider'

export const useMethodName = (
  address: Address,
  method: number
): string | null => {
  const { coinType, networkName } = useEnvironment()

  // Get actor data from GraphQL
  const { data } = useActorQuery({
    variables: {
      address: convertAddrToPrefix(address?.robust || address?.id, coinType)
    },
    skip: !address
  })

  // Resolve actor code, name and message name
  const actorCode = data?.actor?.Code
  const actorName = actorCode ? getActorName(actorCode, networkName) : null
  return actorName ? getMethodName(actorName, method) : null
}
