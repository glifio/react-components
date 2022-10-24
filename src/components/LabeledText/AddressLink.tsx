import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useAddressQuery } from '../../generated/graphql'
import { useEnvironment } from '../../services/EnvironmentProvider'

import truncateAddress from '../../utils/truncateAddress'
import {
  LabeledLink,
  LabeledLinkProps,
  LabeledLinkPropTypes
} from './LabeledLink'

/**
 * AddressLink is a LabeledLink for actor addresses.
 *
 * When fetchAddress is false (default), both id and address can be
 * provided, but only the (robust) address will be shown if present
 *
 * When fetchAddress is true, only the address prop needs to be provided
 * (either id or robust) and the missing information will be fetched.
 */
export const AddressLink = ({
  id,
  address,
  shouldTruncate,
  fetchAddress,
  ...labeledLinkProps
}: AddressLinkProps) => {
  const { explorerUrl } = useEnvironment()
  const { data: gqlAddress } = useAddressQuery({
    skip: !fetchAddress,
    variables: { address }
  })

  // prioritize robust > id
  const linkText = useMemo<string>(() => {
    const robust = gqlAddress?.address?.robust || address
    return robust ? (shouldTruncate ? truncateAddress(robust) : robust) : id
  }, [gqlAddress, address, id, shouldTruncate])

  const copyText = gqlAddress?.address?.robust || address || id
  const href = `${explorerUrl}/actor/?address=${copyText}`

  return (
    <LabeledLink
      href={href}
      linkText={linkText}
      copyText={copyText}
      {...labeledLinkProps}
    />
  )
}

export type AddressLinkProps = {
  id?: string
  address?: string
  shouldTruncate?: boolean
  fetchAddress?: boolean
} & Omit<LabeledLinkProps, 'href' | 'linkText' | 'copyText'>

const { href, linkText, copyText, ...addressLinkPropTypes } =
  LabeledLinkPropTypes

AddressLink.propTypes = {
  id: PropTypes.string,
  address: PropTypes.string,
  shouldTruncate: PropTypes.bool,
  fetchAddress: PropTypes.bool,
  ...addressLinkPropTypes
}

AddressLink.defaultProps = {
  shouldTruncate: true,
  fetchAddress: false
}
