import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'
import {
  DataType,
  describeMessageParams,
  describeFEVMTxParams,
  getActorName
} from '@glif/filecoin-actor-utils'

import { BaseTypeObjLines, DataTypeLines } from './DataTypes'
import { Line, NullishLine } from './Lines'
import { useEnvironment, useLogger } from '../../services/EnvironmentProvider'
import { useActorQuery } from '../../generated/graphql'
import convertAddrToPrefix from '../../utils/convertAddrToPrefix'
import { useStateDecodeParams } from '../../utils/useStateDecodeParams'
import { isDelegatedAddress } from '../../utils/isAddress'
import { useAbi } from '../../utils/useAbi'

export const LinesParams = ({ address, method, params }: LinesParamsProps) => {
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

  // Decode parameters
  const { params: decodedParams, error: decodeParamsError } =
    useStateDecodeParams(address, method, params)

  // Log decode parameter errors
  useEffect(
    () => decodeParamsError && logger.error(decodeParamsError),
    [decodeParamsError, logger]
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

  // Get described parameters
  const describedParams = useMemo<DataType | null>(() => {
    if (isDelegated) {
      try {
        // Describe delegated actor message params
        if (abi) return describeFEVMTxParams(params, abi)
      } catch (e) {
        logger.error(
          `Failed to describe FEVM tx params for network: ${networkName}, address: ${address}, method: ${method}, params: ${params}, with message: ${e.message}`
        )
      }
    } else {
      try {
        // Describe built-in actor message params
        if (actorName && decodedParams)
          return describeMessageParams(actorName, method, decodedParams)
      } catch (e) {
        logger.error(
          `Failed to describe message params for network: ${networkName}, address: ${address}, method: ${method}, params: ${params}, with message: ${e.message}`
        )
      }
    }
    return null
  }, [
    abi,
    address,
    method,
    params,
    isDelegated,
    actorName,
    decodedParams,
    networkName,
    logger
  ])

  // Return most verbose params first
  return describedParams ? (
    <DataTypeLines label='Params' dataType={describedParams} />
  ) : decodedParams ? (
    <BaseTypeObjLines label='Params' data={decodedParams} />
  ) : isDelegated && !abi ? (
    <Line label='Params (upload abi to decode)'>{params}</Line>
  ) : params ? (
    <Line
      label={`Params (${
        decodeParamsError ? 'failed to decode' : 'decoding...'
      })`}
    >
      {params}
    </Line>
  ) : (
    <NullishLine label='Params' />
  )
}

export interface LinesParamsProps {
  address: string
  method: number
  params: string
}

LinesParams.propTypes = {
  address: PropTypes.string.isRequired,
  method: PropTypes.number.isRequired,
  params: PropTypes.string.isRequired
}
