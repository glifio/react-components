import React, { AnchorHTMLAttributes, DetailedHTMLProps, useMemo } from 'react'
import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import Link from 'next/link'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import Box from '../Box'
import { TR, TD } from './table'
import truncateAddress from '../../utils/truncateAddress'
import { MessageConfirmedRow, MESSAGE_CONFIRMED_ROW_PROP_TYPE } from './types'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

// uses next/link for internal page routing
// uses <a> tag for external page routing
function SmartLink(
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) {
  if (props?.href.charAt(0) === '/') {
    return (
      <Link href={props.href} {...props}>
        {props.children}
      </Link>
    )
  }

  return (
    <a href={props.href} target='_blank' rel='noreferrer noopener' {...props}>
      {props.children}
    </a>
  )
}

function AddressWOptionalLink({
  address,
  addressHref,
  inspectingAddress
}: {
  address: string
  inspectingAddress: string
  addressHref: (address: string) => string
}) {
  if (address === inspectingAddress) {
    return <span>{truncateAddress(address)}</span>
  }

  return (
    <SmartLink href={addressHref(address)}>
      {truncateAddress(address)}
    </SmartLink>
  )
}

export default function MessageHistoryRow(props: MessageHistoryRowProps) {
  const { message, time, cidHref, addressHref, inspectingAddress } = props

  const totalCost = useMemo(() => {
    const bnBaseFeeBurn = new BigNumber(message.baseFeeBurn)
    const bnOverEstimationBurn = new BigNumber(message.overEstimationBurn)
    const bnMinerTip = new BigNumber(message.minerTip)
    return new FilecoinNumber(
      bnBaseFeeBurn.plus(bnOverEstimationBurn).plus(bnMinerTip),
      'attofil'
    ).toFil()
  }, [message])

  const age = useMemo(
    () =>
      message.block.Timestamp
        ? dayjs.unix(message.block.Timestamp).from(time)
        : '',
    [message.block.Timestamp, time]
  )

  return (
    <TR>
      <TD>
        <Link href={cidHref(message.cid)}>
          <a
            style={{
              display: 'inline-block',
              maxWidth: '10rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {message.cid.slice()}
          </a>
        </Link>
      </TD>
      <TD>
        <Box
          height='2em'
          lineHeight='2em'
          borderRadius='1em'
          px='1.5em'
          bg='core.secondary'
        >
          {message.methodName.toUpperCase()}
        </Box>
      </TD>
      <TD>{message.height}</TD>
      <TD>{age}</TD>
      <TD>
        <AddressWOptionalLink
          address={message.from.robust}
          addressHref={addressHref}
          inspectingAddress={inspectingAddress}
        />
      </TD>
      <TD>
        <AddressWOptionalLink
          address={message.to.robust}
          addressHref={addressHref}
          inspectingAddress={inspectingAddress}
        />
      </TD>
      <TD>{new FilecoinNumber(message.value, 'attofil').toFil()} FIL</TD>
      <TD>{totalCost}</TD>
    </TR>
  )
}

type MessageHistoryRowProps = {
  message: MessageConfirmedRow
  time: number
  cidHref: (cid: string) => string
  addressHref: (address: string) => string
  inspectingAddress: string
}

MessageHistoryRow.propTypes = {
  message: MESSAGE_CONFIRMED_ROW_PROP_TYPE,
  time: PropTypes.number.isRequired,
  cidHref: PropTypes.func.isRequired,
  addressHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

MessageHistoryRow.defaultProps = {
  inspectingAddress: ''
}
