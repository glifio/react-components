import PropTypes from 'prop-types'
import { useMemo } from 'react'
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
  useNewTabIcon
}: AddressLinkProps) => {
  const { explorerUrl } = useEnvironment()
  // prioritize robust > id, use id if no robust exists
  const linkText = useMemo(() => {
    if (address) return shouldTruncate ? truncateAddress(address) : address
    return id || ''
  }, [address, id, shouldTruncate])
  const copyText = address || id
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
} & Omit<LabeledLinkProps, 'href' | 'linkText' | 'copyText'>

const { href, linkText, copyText, ...addressLinkPropTypes } =
  LabeledLinkPropTypes

AddressLink.propTypes = {
  id: PropTypes.string,
  address: PropTypes.string,
  shouldTruncate: PropTypes.bool,
  ...addressLinkPropTypes
}

AddressLink.defaultProps = {
  shouldTruncate: true
}
