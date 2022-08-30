import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import {
  getActorName,
  describeLotusActorState
} from '@glif/filecoin-actor-utils'

import { useAddressQuery } from '../../../generated/graphql'
import {
  useStateReadState,
  useMsigGetAvailableBalance,
  convertAddrToPrefix
} from '../../../utils'
import { Lines, Line, PageTitle } from '../../Layout'
import { DetailCaption } from '../detail'
import {
  useEnvironment,
  useLogger
} from '../../../services/EnvironmentProvider'

export const ActorState = ({ address: addressProp }: ActorStateProps) => {
  const logger = useLogger()
  const { coinType } = useEnvironment()

  const [showActorState, setShowActorState] = useState(false)

  // Ensure network cointype for address
  const address = useMemo<string>(
    () => convertAddrToPrefix(addressProp, coinType),
    [addressProp, coinType]
  )

  // Load the actor state
  const {
    data: actorStateData,
    loading: actorStateLoading,
    error: actorStateError
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
    () => (actorStateData ? getActorName(actorStateData.Code['/']) : null),
    [actorStateData]
  )

  // Get actor state with descriptors
  const describedState = useMemo<object | null>(
    () => (actorStateData ? describeLotusActorState(actorStateData) : null),
    [actorStateData]
  )

  // Load the available balance for multisig actors
  const hasAvailableBalance = actorName && actorName.includes('multisig')
  const {
    availableBalance,
    loading: availableBalanceLoading,
    error: availableBalanceError
  } = useMsigGetAvailableBalance(hasAvailableBalance ? address : '')

  // Log actor state errors
  useEffect(
    () => actorStateError && logger.error(actorStateError),
    [actorStateError, logger]
  )

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
  const loading = useMemo(() => {
    return actorStateLoading || addressLoading
  }, [actorStateLoading, addressLoading])

  // Actor state or address error
  const error = useMemo(() => {
    return actorStateError || addressError
  }, [actorStateError, addressError])

  return (
    <div>
      <PageTitle>Actor Overview</PageTitle>
      <hr />
      <DetailCaption
        name='Actor Overview'
        caption='Locating this actor on the blockchain...'
        loading={loading}
        error={error}
      />
      {!loading && !error && (
        <Lines>
          {addressData?.address.robust && (
            <Line label='Robust address'>{addressData?.address.robust}</Line>
          )}
          {addressData?.address.id && (
            <Line label='ID'>{addressData?.address.id}</Line>
          )}
          <Line label='Actor Name'>{actorName || 'unknown'}</Line>
          <Line label='Actor Code'>{actorStateData.Code['/']}</Line>
          <Line label='Balance'>
            {new FilecoinNumber(actorStateData?.Balance, 'attofil').toFil()} FIL
          </Line>
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
          <Line label='State'>
            <p role='button' onClick={() => setShowActorState(!showActorState)}>
              Click to{' '}
              {showActorState ? 'hide actor state ↑' : 'show actor state ↓'}
            </p>
          </Line>
          {showActorState && (
            <pre>{JSON.stringify(describedState, null, 2)}</pre>
          )}
        </Lines>
      )}
    </div>
  )
}

interface ActorStateProps {
  address: string
}

ActorState.propTypes = {
  address: PropTypes.string
}
