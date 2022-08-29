import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useAddressQuery } from '../../generated/graphql'
import { useEnvironment } from '../../services'

import truncateAddress from '../../utils/truncateAddress'
import {
  LabeledLink,
  LabeledLinkProps,
  LabeledLinkPropTypes
} from './LabeledLink'

export const AddressLink = ({
  id,
  address,
  label,
  color,
  disableLink,
  hideCopy,
  hideCopyText,
  shouldTruncate,
  fetchAddress,
  useNewTabIcon
}: AddressLinkProps) => {
  const { explorerUrl } = useEnvironment()
  const { data: gqlAddress } = useAddressQuery({
    skip: !id || !!address || !fetchAddress,
    variables: {
      address: id
    }
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
      label={label}
      color={color}
      href={href}
      linkText={linkText}
      copyText={copyText}
      disableLink={disableLink}
      hideCopy={hideCopy}
      hideCopyText={hideCopyText}
      useNewTabIcon={useNewTabIcon}
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
  fetchAddress: true
}
