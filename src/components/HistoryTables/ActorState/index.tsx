import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import {
  DataTypeMap,
  getActorName,
  describeActorState
} from '@glif/filecoin-actor-utils'

import { useAddressQuery } from '../../../generated/graphql'
import { makeFriendlyBalance } from '../../../utils/makeFriendlyBalance'
import { useStateReadState } from '../../../utils/useStateReadState'
import { useMsigGetAvailableBalance } from '../../../utils/useMsigGetAvailableBalance'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'
import {
  Lines,
  Line,
  NullishLine,
  PageTitle,
  CollapsableLines
} from '../../Layout'
import { DetailCaption } from '../detail'
import {
  useEnvironment,
  useLogger
} from '../../../services/EnvironmentProvider'
import { BaseTypeObjLines, DataTypeMapLines } from '../../Layout/DataTypes'
import { isEthAddress, isFilAddress } from '../../../utils/isAddress'
import {
  decode,
  ethAddressFromDelegated,
  newDelegatedEthAddress,
  Protocol
} from '@glif/filecoin-address'

export const ActorState = ({ address: addressProp }: ActorStateProps) => {
  const logger = useLogger()
  const { coinType, networkName } = useEnvironment()

  // Ensure network cointype and address type for address
  const address = useMemo<string>(() => {
    if (isFilAddress(addressProp)) {
      return convertAddrToPrefix(addressProp, coinType)
    } else if (isEthAddress(addressProp)) {
      return newDelegatedEthAddress(addressProp, coinType).toString()
    }
    return ''
  }, [addressProp, coinType])

  const subAddr = useMemo<string | null>(() => {
    if (address && decode(address).protocol() === Protocol.DELEGATED) {
      return ethAddressFromDelegated(address)
    }

    return null
  }, [address])

  // Load the actor state
  const {
    data: actorData,
    loading: actorLoading,
    notFound: actorNotFound,
    error: actorError
  } = useStateReadState(address)

  // Load the address
  const {
    data: addressData,
    loading: addressLoading,
    error: addressError
  } = useAddressQuery({
    variables: { address }
  })

  // Get the actor name from the actor code
  const actorName = useMemo<string | null>(
    () => (actorData ? getActorName(actorData.Code, networkName) : null),
    [actorData, networkName]
  )

  // Capitalize the actor name for display
  const actorNameCapitalized = useMemo<string | null>(
    () =>
      actorName ? actorName.charAt(0).toUpperCase() + actorName.slice(1) : null,
    [actorName]
  )

  // Get actor state with descriptors
  const describedState = useMemo<DataTypeMap | null>(() => {
    try {
      return actorName && actorData?.State
        ? describeActorState(actorName, actorData.State)
        : null
    } catch (e) {
      logger.error(
        `Failed to describe actor state for network: ${networkName}, address: ${address}, with message: ${e.message}`
      )
      return null
    }
  }, [actorName, actorData, address, networkName, logger])

  // Load the available balance for multisig actors
  const hasAvailableBalance = actorName && actorName.includes('multisig')
  const {
    availableBalance,
    loading: availableBalanceLoading,
    error: availableBalanceError
  } = useMsigGetAvailableBalance(hasAvailableBalance ? address : '')

  // Cache friendly balance
  const friendlyBalance = useMemo<string>(() => {
    if (!actorData) return ''
    const balance = new FilecoinNumber(actorData.Balance, 'attofil')
    return makeFriendlyBalance(balance, 6)
  }, [actorData])

  // Log actor state errors
  useEffect(() => actorError && logger.error(actorError), [actorError, logger])

  // Log address errors
  useEffect(
    () => addressError && logger.error(addressError),
    [addressError, logger]
  )

  // Log available balance errors
  useEffect(
    () => availableBalanceError && logger.error(availableBalanceError),
    [availableBalanceError, logger]
  )

  // Actor state or address loading
  const loading = useMemo<boolean>(() => {
    return actorLoading || addressLoading
  }, [actorLoading, addressLoading])

  // Actor state or address error
  const error = useMemo<Error | null>(() => {
    return actorError || addressError || null
  }, [actorError, addressError])

  return (
    <>
      <PageTitle>Actor Overview</PageTitle>
      <hr />
      <DetailCaption
        name='Actor Overview'
        infoMsg={actorNotFound ? `Actor not found: ${address}` : ''}
        loadingMsg='Locating this actor on the blockchain...'
        loading={loading}
        error={error}
      />
      {!loading && !error && !actorNotFound && (
        <Lines>
          {addressData?.address.robust && (
            <Line label='Robust address'>{addressData?.address.robust}</Line>
          )}
          {!!subAddr && <Line label='ETH address'>{subAddr}</Line>}
          {addressData?.address.id && (
            <Line label='ID address'>{addressData?.address.id}</Line>
          )}
          <Line label='Actor name'>{actorNameCapitalized || 'Unknown'}</Line>
          <Line label='Actor code'>{actorData.Code['/']}</Line>
          <Line label='Balance'>{friendlyBalance} FIL</Line>
          {hasAvailableBalance && (
            <Line label='Available Balance'>
              {availableBalanceError ? (
                <>Failed to load</>
              ) : availableBalanceLoading ? (
                <>Loading...</>
              ) : availableBalance ? (
                <>{availableBalance.toFil()} FIL</>
              ) : (
                <></>
              )}
            </Line>
          )}
          {actorData.State ? (
            <CollapsableLines label='State' toggleName='actor state'>
              {describedState ? (
                <DataTypeMapLines depth={1} dataTypeMap={describedState} />
              ) : (
                <BaseTypeObjLines depth={1} data={actorData.State} />
              )}
            </CollapsableLines>
          ) : (
            <NullishLine label='State' />
          )}
        </Lines>
      )}
    </>
  )
}

export interface ActorStateProps {
  address: string
}

ActorState.propTypes = {
  address: PropTypes.string
}
