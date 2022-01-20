import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Link from 'next/link'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { useMessageQuery } from '../../../generated/graphql'
import Box from '../../Box'
import { IconClock } from '../../Icons'
import { P, HR } from '../../Typography'
import { Badge } from '../generic'
import { Head, Line, Status, Confirmations } from '../detail'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

const SeeMore = styled(P).attrs(() => ({
  color: 'core.primary',
  role: 'button'
}))`
  cursor: pointer;
`

export default function MessageDetail(props: MessageDetailProps) {
  const { cid, speedUp, cancel, addressHref } = props
  const [time, setTime] = useState(Date.now())
  const [seeMore, setSeeMore] = useState(false)
  const { data, loading, error } = useMessageQuery({
    variables: { cid }
  })

  const totalCost = useMemo(() => {
    if (!data?.message) return ''
    const bnBaseFeeBurn = new BigNumber(data.message.baseFeeBurn)
    const bnOverEstimationBurn = new BigNumber(data.message.overEstimationBurn)
    const bnMinerTip = new BigNumber(data.message.minerTip)
    return new FilecoinNumber(
      bnBaseFeeBurn.plus(bnOverEstimationBurn).plus(bnMinerTip),
      'attofil'
    ).toFil()
  }, [data?.message])

  const gasPercentage = useMemo(() => {
    if (!data?.message) return ''
    const gasLimit = new BigNumber(data.message.gasLimit)
    const gasUsed = new BigNumber(data.message.gasUsed)
    return gasUsed.dividedBy(gasLimit).times(100).toFixed(1)
  }, [data?.message])

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
        <Confirmations count={11} total={50} />
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
      <Line label='Value'>
        {new FilecoinNumber(data.message.value, 'attofil').toFil()} FIL
      </Line>
      <Line label='Transaction Fee'>{totalCost} FIL</Line>
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
            {data.message.gasLimit}
            <span className='gray'>|</span>
            {data.message.gasUsed} attoFil
            <span>({gasPercentage}%)</span>
          </Line>
          <Line label='Gas Fees'>
            <span className='gray'>Premium</span>
            {new FilecoinNumber(
              data.message.gasPremium,
              'attofil'
            ).toFil()}{' '}
            attoFIL
          </Line>
          <Line label=''>
            <span className='gray'>Fee Cap</span>
            {new FilecoinNumber(data.message.gasFeeCap, 'attofil').toFil()}{' '}
            attoFIL
          </Line>
          <Line label=''>
            <span className='gray'>Base</span>
            {new FilecoinNumber(
              data.message.baseFeeBurn,
              'attofil'
            ).toFil()}{' '}
            attoFIL
          </Line>
          <Line label='Gas Burnt'>
            {new FilecoinNumber(data.message.gasBurned, 'attofil').toFil()}{' '}
            attoFIL
          </Line>
          <HR />
          <Line label='Parameters'>
            {JSON.stringify(data.message.params)}
          </Line>
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
}

MessageDetail.propTypes = {
  cid: PropTypes.string.isRequired,
  speedUp: PropTypes.func,
  cancel: PropTypes.func,
  addressHref: PropTypes.func.isRequired
}
