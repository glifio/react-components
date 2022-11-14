import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'
import { decode as decodeAddr, Protocol } from '@glif/filecoin-address'
import {
  DataType,
  describeMessageReturn,
  getActorName,
  describeFEVMMessageReturn
} from '@glif/filecoin-actor-utils'
import { decode } from '@ipld/dag-cbor'
import { fromString } from 'uint8arrays'

import { DataTypeLines } from './DataTypes'
import { Line, NullishLine } from './Lines'
import { useEnvironment, useLogger } from '../../services/EnvironmentProvider'
import { useActorQuery } from '../../generated/graphql'
import { convertAddrToPrefix, useAbi } from '../../utils'

export const LinesReturn = ({
  address,
  method,
  returnVal,
  inputParams
}: LinesReturnProps) => {
  const { coinType, networkName } = useEnvironment()
  const logger = useLogger()

  // Get actor data
  const { data: actorData, error: actorDataError } = useActorQuery({
    variables: { address: convertAddrToPrefix(address, coinType) }
  })

  // Log actor data errors
  useEffect(
    () => actorDataError && logger.error(actorDataError),
    [actorDataError, logger]
  )

  // Decode return value
  const decodedReturnVal = useMemo<Record<string, any> | null>(
    () => (returnVal ? decode(fromString(returnVal, 'base64')) : null),
    [returnVal]
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

  const [abi] = useAbi(address)

  // Get described return value
  const describedReturnVal = useMemo<DataType | null>(() => {
    if (
      decodeAddr(address).protocol() === Protocol.DELEGATED &&
      !!abi &&
      !!inputParams
    ) {
      try {
        return describeFEVMMessageReturn(inputParams, returnVal, abi)
      } catch (e) {
        logger.error(
          `Failed to describe fevm message return for network: ${networkName}, address: ${address}, method: ${method}, return: ${returnVal} with message: ${e.message}`
        )
      }
    } else if (actorName && decodedReturnVal) {
      try {
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
    inputParams,
    returnVal,
    actorName,
    decodedReturnVal,
    networkName,
    logger
  ])

  // Return most verbose return value first
  return describedReturnVal ? (
    <DataTypeLines label='Return' dataType={describedReturnVal} />
  ) : returnVal ? (
    <Line label='Return (failed to decode)'>{returnVal}</Line>
  ) : (
    <NullishLine label='Return' />
  )
}

export interface LinesReturnProps {
  address: string
  method: number
  returnVal: string
  inputParams?: string
}

LinesReturn.propTypes = {
  address: PropTypes.string.isRequired,
  method: PropTypes.number.isRequired,
  returnVal: PropTypes.string.isRequired,
  inputParams: PropTypes.string
}
