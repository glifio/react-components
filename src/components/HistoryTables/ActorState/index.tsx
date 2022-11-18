import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import {
  DataTypeMap,
  getActorName,
  describeActorState
} from '@glif/filecoin-actor-utils'
import {
  delegatedFromEthAddress,
  ethAddressFromDelegated
} from '@glif/filecoin-address'

import { useAddressQuery } from '../../../generated/graphql'
import { makeFriendlyBalance } from '../../../utils/makeFriendlyBalance'
import { useStateReadState } from '../../../utils/useStateReadState'
import { useMsigGetAvailableBalance } from '../../../utils/useMsigGetAvailableBalance'
import { isDelegatedAddress, isEthAddress } from '../../../utils/isAddress'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'
import {
  Lines,
  Line,
  NullishLine,
  PageTitle,
  CollapsableLines
} from '../../Layout'
import { AbiSelector } from '../../AbiSelector'
import { DetailCaption } from '../detail'
import {
  Network,
  useEnvironment,
  useLogger
} from '../../../services/EnvironmentProvider'
import { BaseTypeObjLines, DataTypeMapLines } from '../../Layout/DataTypes'

export const ActorState = ({ address: addressProp }: ActorStateProps) => {
  const logger = useLogger()
  const { coinType, networkName } = useEnvironment()

  // Ensure network cointype and address type for address
  const address = useMemo<string>(
    () =>
      isEthAddress(addressProp)
        ? delegatedFromEthAddress(addressProp)
        : convertAddrToPrefix(addressProp, coinType),
    [addressProp, coinType]
  )

  // Convert address to eth address if delegated
  const ethAddress = useMemo<string | null>(
    () =>
      isDelegatedAddress(address) ? ethAddressFromDelegated(address) : null,
    [address]
  )

  // Load the actor state
  const {
    data: actorData,
    loading: actorLoading,
    notFound: actorNotFound,
    error: _actorError
  } = useStateReadState(address)

  //
  const { actorError, tmpPatchWlbyActorErr } = useMemo<{
    actorError: Error
    tmpPatchWlbyActorErr: boolean
  }>(() => {
    if (
      _actorError &&
      networkName === Network.WALLABY &&
      _actorError.message.includes('dumping actor state')
    ) {
      return { actorError: null, tmpPatchWlbyActorErr: true }
    }

    return { actorError: _actorError, tmpPatchWlbyActorErr: false }
  }, [_actorError, networkName])

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
      {tmpPatchWlbyActorErr ? (
        <>
          <Lines>
            {addressData?.address.robust && (
              <Line label='Robust address'>{addressData?.address.robust}</Line>
            )}
            {addressData?.address.id && (
              <Line label='ID address'>{addressData?.address.id}</Line>
            )}
            {ethAddress && <Line label='ETH address'>{ethAddress}</Line>}
            <Line label='Actor name'>EVM</Line>
          </Lines>
        </>
      ) : (
        <>
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
                <Line label='Robust address'>
                  {addressData?.address.robust}
                </Line>
              )}
              {addressData?.address.id && (
                <Line label='ID address'>{addressData?.address.id}</Line>
              )}
              {ethAddress && <Line label='ETH address'>{ethAddress}</Line>}
              <Line label='Actor name'>
                {actorNameCapitalized || 'Unknown'}
              </Line>
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
              {ethAddress && (
                <Line label='ABI'>
                  <AbiSelector address={address} />
                </Line>
              )}
            </Lines>
          )}
        </>
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
