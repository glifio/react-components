import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Link from 'next/link'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { useChainHeadSubscription } from '../../../generated/graphql'
import Box from '../../Box'
import { IconClock } from '../../Icons'
import { P, HR } from '../../Typography'
import { Badge } from '../generic'
import { Head, Line, Status, Confirmations, Parameters } from '../detail'
import {
  attoFilToFil,
  getTotalCost,
  getGasPercentage,
  formatNumber
} from '../utils'
import { getMethodName } from '../methodName'
import { useMessage } from '../useAllMessages'
import { useUnformattedDateTime } from './useAge'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

const SeeMore = styled(P).attrs(() => ({
  color: 'core.primary',
  role: 'button'
}))`
  cursor: pointer;
`

export default function MessageDetail(props: MessageDetailProps) {
  const { cid, speedUp, cancel, addressHref, confirmations } = props
  const time = useMemo(() => Date.now(), [])
  const [seeMore, setSeeMore] = useState(false)
  const { message, loading, error } = useMessage(cid)
  const chainHeadSubscription = useChainHeadSubscription({
    variables: {},
    shouldResubscribe: true
  })

  console.log(chainHeadSubscription)

  const value = useMemo(
    () => (message?.value ? attoFilToFil(message.value) : ''),
    [message?.value]
  )
  const totalCost = useMemo(
    () => (message ? getTotalCost(message) : ''),
    [message]
  )
  const gasPercentage = useMemo(
    () => (message ? getGasPercentage(message) : ''),
    [message]
  )
  const unformattedTime = useUnformattedDateTime(
    chainHeadSubscription,
    message,
    time
  )

  const confirmationCount = useMemo(
    () =>
      chainHeadSubscription.data?.chainHead.height && !!message?.height
        ? chainHeadSubscription.data.chainHead.height - message.height
        : 0,
    [message?.height, chainHeadSubscription.data?.chainHead.height]
  )

  const methodName = useMemo(
    () => getMethodName(message?.actorName, message?.method),
    [message?.actorName, message?.method]
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  return (
    <Box>
      <Head title='Message Overview' speedUp={speedUp} cancel={cancel} />
      <HR />
      <Line label='CID'>{cid}</Line>
      <Line label='Status and Confirmations'>
        <Status exitCode={message.exitCode} />
        <Confirmations count={confirmationCount} total={confirmations} />
      </Line>
      <Line label='Height'>{message.height}</Line>
      <Line label='Timestamp'>
        <IconClock width='1.125em' />
        {unformattedTime
          ? `${unformattedTime?.from(time)} (${unformattedTime?.toString()})`
          : ''}
      </Line>
      <HR />
      <Line label='From'>
        {message.from.robust}
        <Link
          href={addressHref(message.from.robust)}
        >{`(${message.from.id})`}</Link>
      </Line>
      <Line label='To'>
        {message.to.robust}
        <Link
          href={addressHref(message.to.robust)}
        >{`(${message.to.id})`}</Link>
      </Line>
      <HR />
      <Line label='Value'>{value}</Line>
      <Line label='Transaction Fee'>{totalCost}</Line>
      {!loading && methodName && (
        <Line label='Method'>
          <Badge color='purple'>{methodName.toUpperCase()}</Badge>
        </Line>
      )}
      <HR />
      <SeeMore onClick={() => setSeeMore(!seeMore)}>
        Click to see {seeMore ? 'less ↑' : 'more ↓'}
      </SeeMore>
      <HR />
      {seeMore && (
        <>
          <Line label='Gas Limit & Usage by Txn'>
            {formatNumber(message.gasLimit)}
            <span className='gray'>|</span>
            {formatNumber(message.gasUsed)} attoFil
            <span>({gasPercentage})</span>
          </Line>
          <Line label='Gas Fees'>
            <span className='gray'>Premium</span>
            {formatNumber(message.gasPremium)} attoFIL
          </Line>
          <Line label=''>
            <span className='gray'>Fee Cap</span>
            {formatNumber(message.gasFeeCap)} attoFIL
          </Line>
          <Line label=''>
            <span className='gray'>Base</span>
            {formatNumber(message.baseFeeBurn)} attoFIL
          </Line>
          <Line label='Gas Burnt'>
            {formatNumber(message.gasBurned)} attoFIL
          </Line>
          <HR />
          <Parameters params={{ params: message.params }} depth={0} />
        </>
      )}
    </Box>
  )
}

type MessageDetailProps = {
  cid: string
  speedUp?: () => void
  cancel?: () => void
  addressHref: (address: string) => string
  confirmations: number
}

MessageDetail.propTypes = {
  cid: PropTypes.string.isRequired,
  speedUp: PropTypes.func,
  cancel: PropTypes.func,
  addressHref: PropTypes.func.isRequired,
  confirmations: PropTypes.number.isRequired
}
