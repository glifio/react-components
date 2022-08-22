import PropTypes from 'prop-types'
import { useMemo } from 'react'

import truncateAddress from '../../utils/truncateAddress'
import { LabeledLink } from './LabeledLink'

const explorerUrl =
  process.env.NEXT_PUBLIC_EXPLORER_URL ||
  'https://explorer-calibration.glif.link'

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
  // prioritize robust > id, use id if no robust exists
  const linkText = useMemo(() => {
    if (address)
      return shouldTruncate ? truncateAddress(address) : address
    return id || ''
  }, [address, id, shouldTruncate])
  const copyText = address || id
  const linkHref = `${explorerUrl}/actor/?address=${copyText}`
  return (
    <LabeledLink
      label={label}
      color={color}
      href={linkHref}
      linkText={linkText}
      copyText={copyText}
      disableLink={disableLink}
      hideCopy={hideCopy}
      hideCopyText={hideCopyText}
      useNewTabIcon={useNewTabIcon}
    />
  )
}

export interface AddressLinkProps {
  id?: string
  address?: string
  label?: string
  color?: string
  disableLink: boolean
  hideCopy: boolean
  hideCopyText: boolean
  shouldTruncate?: boolean
  useNewTabIcon?: boolean
}

AddressLink.propTypes = {
  id: PropTypes.string,
  address: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  disableLink: PropTypes.bool,
  hideCopy: PropTypes.bool,
  hideCopyText: PropTypes.bool,
  shouldTruncate: PropTypes.bool,
  useNewTabIcon: PropTypes.bool
}

AddressLink.defaultProps = {
  color: 'var(--purple-medium)',
  disableLink: false,
  hideCopy: false,
  hideCopyText: true,
  shouldTruncate: true,
  useNewTabIcon: false
}
