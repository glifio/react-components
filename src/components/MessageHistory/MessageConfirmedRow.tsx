import React, { AnchorHTMLAttributes, DetailedHTMLProps, useMemo } from 'react'
import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Box from '../Box'
import { P } from '../Typography'
import truncateAddress from '../../utils/truncateAddress'
import { MessageConfirmed, MESSAGE_CONFIRMED_ROW_PROP_TYPES } from './types'

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
  methodName,
  height,
  from,
  to,
  value,
  inspectingAddress,
  block,
  baseFeeBurn,
  overEstimationBurn,
  minerTip,
  cidHref,
  addressHref
}: MessageConfirmed & {
  inspectingAddress: string
  // these helper funcs are for generating hrefs from strings
  // will allow us to plop this message history component in any other requiring app
  cidHref: (cid: string) => string
  addressHref: (address: string) => string
}) {
  const totalCost = useMemo(() => {
    const bnBaseFeeBurn = new BigNumber(baseFeeBurn)
    const bnOverEstimationBurn = new BigNumber(overEstimationBurn)
    const bnMinerTip = new BigNumber(minerTip)
    return new FilecoinNumber(
      bnBaseFeeBurn.plus(bnOverEstimationBurn).plus(bnMinerTip),
      'attofil'
    ).toFil()
  }, [baseFeeBurn, overEstimationBurn, minerTip])

  // ? CSS grid ?
  return (
    <Box display='flex' flexDirection='row'>
      <Link href={cidHref(cid)}>{cid.slice()}</Link>
      <Box borderRadius='8px' background='core.primary'>
        {methodName.toUpperCase()}
      </Box>
      <P>{height}</P>
      <P>{block.Timestamp}</P>
      <AddressWOptionalLink
        address={from.robust}
        addressHref={addressHref}
        inspectingAddress={inspectingAddress}
      />
      <AddressWOptionalLink
        address={to.robust}
        addressHref={addressHref}
        inspectingAddress={inspectingAddress}
      />
      <P>{new FilecoinNumber(value, 'fil').toFil()}</P>
      <P>{totalCost}</P>
    </Box>
  )
}

MessageHistoryRow.propTypes = {
  ...MESSAGE_CONFIRMED_ROW_PROP_TYPES,
  cidHref: PropTypes.func.isRequired,
  addressHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

MessageHistoryRow.defaultProps = {
  inspectingAddress: ''
}
