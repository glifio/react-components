import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'
import {
  DataType,
  describeMessageReturn,
  describeFEVMTxReturn,
  getActorName
} from '@glif/filecoin-actor-utils'
import { decode } from '@ipld/dag-cbor'
import { fromString } from 'uint8arrays'

import { DataTypeLines } from './DataTypes'
import { Line, NullishLine } from './Lines'
import { useEnvironment, useLogger } from '../../services/EnvironmentProvider'
import { useActorQuery } from '../../generated/graphql'
import convertAddrToPrefix from '../../utils/convertAddrToPrefix'
import { isDelegatedAddress } from '../../utils/isAddress'
import { useAbi } from '../../utils/useAbi'

export const LinesReturn = ({
  address,
  method,
  params,
  returnVal
}: LinesReturnProps) => {
  const { coinType, networkName } = useEnvironment()
  const { abi } = useAbi(address)
  const logger = useLogger()
  const isDelegated = useMemo<boolean>(
    () => isDelegatedAddress(address),
    [address]
  )

  // Get actor data
  const { data: actorData, error: actorDataError } = useActorQuery({
    variables: { address: convertAddrToPrefix(address, coinType) }
  })

  // Log actor data errors
  useEffect(
    () => actorDataError && logger.error(actorDataError),
    [actorDataError, logger]
  )

  // Decode return value (returns null for delegated actors)
  const decodedReturnVal = useMemo<Record<string, any> | null>(
    () =>
      !isDelegated && returnVal
        ? decode(fromString(returnVal, 'base64'))
        : null,
    [isDelegated, returnVal]
  )

  // Get actor code and name
  const actorCode = useMemo(() => actorData?.actor?.Code, [actorData])
  const actorName = useMemo<string | null>(() => {
    if (actorCode) {
      const name = getActorName(actorCode, networkName)
      if (name) return name
      logger.error(`Failed to retrieve actor name for code: ${actorCode}`)
    }
    return null
  }, [actorCode, networkName, logger])

  // Get described return value
  const describedReturnVal = useMemo<DataType | null>(() => {
    if (isDelegated) {
      try {
        // Describe delegated actor message return
        if (abi) return describeFEVMTxReturn(params, returnVal, abi)
      } catch (e) {
        logger.error(
          `Failed to describe FEVM tx return for network: ${networkName}, address: ${address}, method: ${method}, params: ${params}, return: ${returnVal}, with message: ${e.message}`
        )
      }
    } else {
      try {
        // Describe built-in actor message return
        if (actorName && decodedReturnVal)
          return describeMessageReturn(actorName, method, decodedReturnVal)
      } catch (e) {
        logger.error(
          `Failed to describe message return for network: ${networkName}, address: ${address}, method: ${method}, return: ${returnVal}, with message: ${e.message}`
        )
      }
    }
    return null
  }, [
    abi,
    address,
    method,
    params,
    returnVal,
    isDelegated,
    actorName,
    decodedReturnVal,
    networkName,
    logger
  ])

  // Return most verbose return value first
  return describedReturnVal ? (
    <DataTypeLines label='Return' dataType={describedReturnVal} />
  ) : isDelegated && !abi ? (
    <Line label='Return (upload abi to decode)'>{returnVal}</Line>
  ) : returnVal ? (
    <Line label='Return (failed to decode)'>{returnVal}</Line>
  ) : (
    <NullishLine label='Return' />
  )
}

export interface LinesReturnProps {
  address: string
  method: number
  params: string
  returnVal: string
}

LinesReturn.propTypes = {
  address: PropTypes.string.isRequired,
  method: PropTypes.number.isRequired,
  params: PropTypes.string.isRequired,
  returnVal: PropTypes.string.isRequired
}
