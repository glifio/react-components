import React, { AnchorHTMLAttributes, DetailedHTMLProps, useMemo } from 'react'
import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import { useMessageQuery } from '../../generated/graphql'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Box from '../Box'
import { P } from '../Typography'
import truncateAddress from '../../utils/truncateAddress'

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

type MessageHistoryRowProps = {
  cid: string
  cidHref: (cid: string) => string
  addressHref: (address: string) => string
  inspectingAddress: string
}

export default function MessageHistoryRow(props: MessageHistoryRowProps) {
  const { data, loading, error } = useMessageQuery({
    variables: {
      cid: props.cid
    }
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
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  // ? CSS grid ?
  return (
    <Box display='flex' flexDirection='row'>
      <Link href={props.cidHref(props.cid)}>{props.cid.slice()}</Link>
      <Box borderRadius='8px' background='core.primary'>
        {data.message.methodName.toUpperCase()}
      </Box>
      <P>{data.message.height}</P>
      <P>{data.message.block.Timestamp}</P>
      <AddressWOptionalLink
        address={data.message.from.robust}
        addressHref={props.addressHref}
        inspectingAddress={props.inspectingAddress}
      />
      <AddressWOptionalLink
        address={data.message.to.robust}
        addressHref={props.addressHref}
        inspectingAddress={props.inspectingAddress}
      />
      <P>{new FilecoinNumber(data.message.value, 'fil').toFil()}</P>
      <P>{totalCost}</P>
    </Box>
  )
}

MessageHistoryRow.propTypes = {
  cid: PropTypes.string.isRequired,
  cidHref: PropTypes.func.isRequired,
  addressHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

MessageHistoryRow.defaultProps = {
  inspectingAddress: ''
}
