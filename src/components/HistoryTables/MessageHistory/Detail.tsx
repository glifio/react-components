import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Link from 'next/link'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import {
  useMessageQuery,
  useChainHeadSubscription
} from '../../../generated/graphql'
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
  const [time, setTime] = useState(Date.now())
  const [seeMore, setSeeMore] = useState(false)
  const { data, loading, error } = useMessageQuery({
    variables: { cid }
  })
  const chainHeadSubscription = useChainHeadSubscription({
    variables: {}
  })
  const value = useMemo(
    () => (data?.message.value ? attoFilToFil(data?.message.value) : ''),
    [data?.message.value]
  )
  const totalCost = useMemo(
    () => (data?.message ? getTotalCost(data.message) : ''),
    [data?.message]
  )
  const gasPercentage = useMemo(
    () => (data?.message ? getGasPercentage(data.message) : ''),
    [data?.message]
  )
  const timestamp = useMemo(
    () => data?.message.block.Timestamp ?? null,
    [data?.message.block.Timestamp]
  )
  const date = useMemo(
    () => (timestamp ? dayjs.unix(timestamp).toString() : ''),
    [timestamp]
  )
  const age = useMemo(
    () => (timestamp ? dayjs.unix(timestamp).from(time) : ''),
    [timestamp, time]
  )
  const confirmationCount = useMemo(
    () =>
      chainHeadSubscription.data?.chainHead.height && data?.message.height
        ? chainHeadSubscription.data.chainHead.height - data.message.height
        : 0,
    [data?.message.height, chainHeadSubscription.data?.chainHead.height]
  )

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => clearInterval(interval)
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  return (
    <Box>
      <Head title='Message Overview' speedUp={speedUp} cancel={cancel} />
      <HR />
      <Line label='CID'>{cid}</Line>
      <Line label='Status and Confirmations'>
        <Status exitCode={data.message.exitCode} />
        <Confirmations count={confirmationCount} total={confirmations} />
      </Line>
      <Line label='Height'>{data.message.height}</Line>
      <Line label='Timestamp'>
        <IconClock width='1.125em' />
        {age} ({date})
      </Line>
      <HR />
      <Line label='From'>
        {data.message.from.robust}
        <Link
          href={addressHref(data.message.from.robust)}
        >{`(${data.message.from.id})`}</Link>
      </Line>
      <Line label='To'>
        {data.message.to.robust}
        <Link
          href={addressHref(data.message.to.robust)}
        >{`(${data.message.to.id})`}</Link>
      </Line>
      <HR />
      <Line label='Value'>{value}</Line>
      <Line label='Transaction Fee'>{totalCost}</Line>
      <Line label='Method'>
        <Badge color='purple'>{data.message.methodName.toUpperCase()}</Badge>
      </Line>
      <HR />
      <SeeMore onClick={() => setSeeMore(!seeMore)}>
        Click to see {seeMore ? 'less ↑' : 'more ↓'}
      </SeeMore>
      <HR />
      {seeMore && (
        <>
          <Line label='Gas Limit & Usage by Txn'>
            {formatNumber(data.message.gasLimit)}
            <span className='gray'>|</span>
            {formatNumber(data.message.gasUsed)} attoFil
            <span>({gasPercentage})</span>
          </Line>
          <Line label='Gas Fees'>
            <span className='gray'>Premium</span>
            {formatNumber(data.message.gasPremium)} attoFIL
          </Line>
          <Line label=''>
            <span className='gray'>Fee Cap</span>
            {formatNumber(data.message.gasFeeCap)} attoFIL
          </Line>
          <Line label=''>
            <span className='gray'>Base</span>
            {formatNumber(data.message.baseFeeBurn)} attoFIL
          </Line>
          <Line label='Gas Burnt'>
            {formatNumber(data.message.gasBurned)} attoFIL
          </Line>
          <HR />
          <Parameters params={{ params: data.message.params }} depth={0} />
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
