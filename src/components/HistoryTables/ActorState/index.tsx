import { FilecoinNumber } from '@glif/filecoin-number'
import { useMemo, useState } from 'react'
import { useAddressQuery } from '../../../generated/graphql'
import {
  useStateReadStateQuery,
  decodeActorCID,
  MsigState
} from '../../../utils'
import Box from '../../Box'
import { Lines, Line } from '../../Layout'
import { Title } from '../generic'
import { DetailCaption } from '../detail'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'

function State({ state }: { state: unknown }) {
  return (
    <>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  )
}

export function ActorState({ address }: { address: string }) {
  const {
    data: actorStateData,
    error: actorStateError,
    loading: actorStateLoading
  } = useStateReadStateQuery<unknown>({
    variables: {
      address: convertAddrToPrefix(address)
    }
  })

  const {
    data: addressData,
    error: adddressError,
    loading: addressLoading
  } = useAddressQuery({ variables: { address: convertAddrToPrefix(address) } })

  const [viewActorState, setViewActorState] = useState(false)

  const actorType = useMemo(() => {
    return decodeActorCID(actorStateData?.Code['/'])
  }, [actorStateData?.Code])

  const loading = useMemo(() => {
    return actorStateLoading || addressLoading
  }, [actorStateLoading, addressLoading])

  const error = useMemo(() => {
    return actorStateError || adddressError
  }, [actorStateError, adddressError])

  return (
    <div>
      <Title>Overview</Title>
      <hr />
      <DetailCaption
        name='Actor Overview'
        captian='Locating this actor on the blockchain...'
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
          <Line label='Actor'>{actorType}</Line>
          <Line label='Balance'>
            {new FilecoinNumber(actorStateData?.Balance, 'attofil').toFil()} FIL
          </Line>
          {actorType.includes('/multisig') && (
            <Line label='Available Balance'>
              {new FilecoinNumber(
                (actorStateData?.State as MsigState).AvailableBalance,
                'attofil'
              ).toFil()}{' '}
              FIL
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
            <p role='button' onClick={() => setViewActorState(!viewActorState)}>
              Click to{' '}
              {viewActorState ? 'hide actor state ↑' : 'see actor state ↓'}
            </p>
          </Box>
          <Box>{viewActorState && <State state={actorStateData?.State} />}</Box>
        </Lines>
      )}
    </div>
  )
}
