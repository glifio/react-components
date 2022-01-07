import React, { AnchorHTMLAttributes, DetailedHTMLProps, useMemo } from 'react'
import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Box from '../Box'
import { TR, TD, P } from '../Typography'
import truncateAddress from '../../utils/truncateAddress'
import { MessageConfirmedRow, MESSAGE_CONFIRMED_ROW_PROP_TYPE } from './types'

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
    return <P>{truncateAddress(address)}</P>
  }

  return (
    <SmartLink href={addressHref(address)}>
      {truncateAddress(address)}
    </SmartLink>
  )
}

export default function MessageHistoryRow(props: MessageHistoryRowProps) {
  const { message, cidHref, addressHref, inspectingAddress } = props
  const totalCost = useMemo(() => {
    const bnBaseFeeBurn = new BigNumber(message.baseFeeBurn)
    const bnOverEstimationBurn = new BigNumber(message.overEstimationBurn)
    const bnMinerTip = new BigNumber(message.minerTip)
    return new FilecoinNumber(
      bnBaseFeeBurn.plus(bnOverEstimationBurn).plus(bnMinerTip),
      'attofil'
    ).toFil()
  }, [message])

  return (
    <TR>
      <TD>
        <Link href={cidHref(message.cid)}>{message.cid.slice()}</Link>
      </TD>
      <TD>
        <Box borderRadius='8px' background='core.primary'>
          {message.methodName.toUpperCase()}
        </Box>
      </TD>
      <TD>{message.height}</TD>
      <TD>{message.block.Timestamp}</TD>
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
      <TD>{new FilecoinNumber(message.value, 'fil').toFil()}</TD>
      <TD>{totalCost}</TD>
    </TR>
  )
}

type MessageHistoryRowProps = {
  message: MessageConfirmedRow
  cidHref: (cid: string) => string
  addressHref: (address: string) => string
  inspectingAddress: string
}

MessageHistoryRow.propTypes = {
  message: MESSAGE_CONFIRMED_ROW_PROP_TYPE,
  cidHref: PropTypes.func.isRequired,
  addressHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

MessageHistoryRow.defaultProps = {
  inspectingAddress: ''
}
