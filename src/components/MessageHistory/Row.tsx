import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Box from '../Box'
import { P } from '../Typography'
import truncateAddress from '../../utils/truncateAddress'
import { MessageBase, messagePropTypes } from './types'

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

export default function MessageHistoryRow({
  cid,
  method,
  height,
  timestamp,
  from,
  to,
  value,
  status,
  feePaid,
  inspectingAddress,
  cidHref,
  addressHref
}: MessageBase & {
  inspectingAddress: string
  // these helper funcs are for generating hrefs from strings
  // will allow us to plop this message history component in any other requiring app
  cidHref: (cid: string) => string
  addressHref: (address: string) => string
}) {
  // Code here is just to throw _something_ up... can delete all of this...
  // I'd probably use CSS grid on this?
  return (
    <Box display='flex' flexDirection='row'>
      <Link href={cidHref(cid)}>{cid.slice()}</Link>
      <Box borderRadius='8px' background='core.primary'>
        {method.toUpperCase()}
      </Box>
      {status === 'PENDING' ? <P>(pending)</P> : <P>{height}</P>}

      <P>{timestamp}</P>
      <AddressWOptionalLink
        address={from}
        addressHref={addressHref}
        inspectingAddress={inspectingAddress}
      />
      <AddressWOptionalLink
        address={to}
        addressHref={addressHref}
        inspectingAddress={inspectingAddress}
      />
      <P>{new FilecoinNumber(value, 'attofil').toFil()}</P>
      {status === 'PENDING' ? (
        <P>(pending)</P>
      ) : (
        <P>{new FilecoinNumber(feePaid, 'attofil').toFil()}</P>
      )}
    </Box>
  )
}

MessageHistoryRow.propTypes = {
  ...messagePropTypes,
  cidHref: PropTypes.func.isRequired,
  addressHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

MessageHistoryRow.defaultProps = {
  inspectingAddress: ''
}
