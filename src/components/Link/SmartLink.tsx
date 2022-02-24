import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'
import Link from 'next/link'
import truncateAddress from '../../utils/truncateAddress'
// uses next/link for internal page routing
// uses <a> tag for external page routing
export function SmartLink(
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) {
  if (props?.href.charAt(0) === '/') {
    return (
      <Link href={props.href}>
        <a {...props}>
          {props.children}
        </a>
      </Link>
    )
  }

  return (
    <a href={props.href} target='_blank' rel='noreferrer noopener' {...props}>
      {props.children}
    </a>
  )
}

export function AddressWOptionalLink({
  address,
  addressHref,
  inspectingAddress,
  onClick
}: {
  address: string
  inspectingAddress: string
  addressHref: (address: string) => string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  if (address === inspectingAddress) {
    return <span>{truncateAddress(address)}</span>
  }

  return (
    <SmartLink onClick={onClick} href={addressHref(address)}>
      {truncateAddress(address)}
    </SmartLink>
  )
}
