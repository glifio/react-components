import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useEnvironment } from '../../services'

import truncateAddress from '../../utils/truncateAddress'
import {
  LabeledLink,
  LabeledLinkProps,
  LabeledLinkPropTypes
} from './LabeledLink'

export const CidLink = ({
  cid,
  label,
  color,
  disableLink,
  hideCopy,
  hideCopyText,
  shouldTruncate,
  useNewTabIcon
}: CidLinkProps) => {
  const { explorerUrl } = useEnvironment()
  const linkText = useMemo(
    () => (shouldTruncate ? truncateAddress(cid) : cid),
    [cid, shouldTruncate]
  )
  const href = `${explorerUrl}/message/?cid=${cid}`
  return (
    <LabeledLink
      label={label}
      color={color}
      href={href}
      linkText={linkText}
      copyText={cid}
      disableLink={disableLink}
      hideCopy={hideCopy}
      hideCopyText={hideCopyText}
      useNewTabIcon={useNewTabIcon}
    />
  )
}

export type CidLinkProps = {
  cid?: string
  shouldTruncate?: boolean
} & Omit<LabeledLinkProps, 'href' | 'linkText' | 'copyText'>

const { href, linkText, copyText, ...cidLinkPropTypes } = LabeledLinkPropTypes

CidLink.propTypes = {
  cid: PropTypes.string,
  shouldTruncate: PropTypes.bool,
  ...cidLinkPropTypes
}

CidLink.defaultProps = {
  shouldTruncate: true
}
