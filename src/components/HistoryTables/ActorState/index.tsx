import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import { getActorName } from '@glif/filecoin-actor-utils'

import { useAddressQuery } from '../../../generated/graphql'
import {
  useStateReadStateQuery,
  convertAddrToPrefix,
  decodeActorCID
} from '../../../utils'
import Box from '../../Box'
import { Lines, Line, PageTitle } from '../../Layout'
import { DetailCaption } from '../detail'
import {
  useEnvironment,
  useLogger
} from '../../../services/EnvironmentProvider'
import { useMsigGetAvailableBalance } from '../../../utils/useMsigGetAvailableBalance'

const State = ({ state }: { state: unknown }) => (
  <pre>{JSON.stringify(state, null, 2)}</pre>
)

export const ActorState = ({ address: addressProp }: ActorStateProps) => {
  const { coinType, networkName } = useEnvironment()
  const logger = useLogger()

  // Ensure network cointype for address
  const address = useMemo<string>(
    () => convertAddrToPrefix(addressProp, coinType),
    [addressProp, coinType]
  )

  const {
    data: actorStateData,
    error: actorStateError,
    loading: actorStateLoading
  } = useStateReadStateQuery<unknown>({
    variables: { address }
  })

  // Get the actor name from the actor code
  const actorName = useMemo<string | null>(
    () => (actorStateData ? getActorName(actorStateData.Code['/']) : null),
    [actorStateData]
  )

  // Load available balance for multisig actors
  const hasAvailableBalance = actorName && actorName.includes('multisig')
  const {
    availableBalance,
    loading: availableBalanceLoading,
    error: availableBalanceError
  } = useMsigGetAvailableBalance(hasAvailableBalance ? address : '')

  // Log available balance errors
  useEffect(
    () => availableBalanceError && logger.error(availableBalanceError),
    [availableBalanceError, logger]
  )

  const {
    data: addressData,
    error: addressError,
    loading: addressLoading
  } = useAddressQuery({
    variables: { address }
  })

  const [viewActorState, setViewActorState] = useState(false)

  const loading = useMemo(() => {
    return actorStateLoading || addressLoading
  }, [actorStateLoading, addressLoading])

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
          <Box
            display='flex'
            gridGap='1em'
            lineHeight='2em'
            alignItems='center'
          >
            <Box minWidth='200px' flex='0 1 25%'>
              State
            </Box>
            {viewActorState ? (
              <p role='button' onClick={() => setViewActorState(false)}>
                Click to hide actor state ↑
              </p>
            ) : (
              <p role='button' onClick={() => setViewActorState(true)}>
                Click to see actor state ↓
              </p>
            )}
          </Box>
          <Box>{viewActorState && <State state={actorStateData?.State} />}</Box>
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
