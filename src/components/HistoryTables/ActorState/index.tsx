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
    () => (actorData ? getActorName(actorData.Code['/']) : null),
    [actorData]
  )

  // Get actor state with descriptors
  const describedState = useMemo<object | null>(
    () => (actorData ? describeLotusActorState(actorData) : null),
    [actorData]
  )

  // Load the available balance for multisig actors
  const hasAvailableBalance = actorName && actorName.includes('multisig')
  const {
    availableBalance,
    loading: availableBalanceLoading,
    error: availableBalanceError
  } = useMsigGetAvailableBalance(hasAvailableBalance ? address : '')

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
    <div>
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
          {addressData?.address.id && (
            <Line label='ID address'>{addressData?.address.id}</Line>
          )}
          {addressData?.address.robust && (
            <Line label='Robust address'>{addressData?.address.robust}</Line>
          )}
          <Line label='Actor name'>{actorName || 'unknown'}</Line>
          <Line label='Actor code'>{actorData.Code['/']}</Line>
          <Line label='Balance'>
            {new FilecoinNumber(actorData.Balance, 'attofil').toFil()} FIL
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
