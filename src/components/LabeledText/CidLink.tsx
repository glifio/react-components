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
  shouldTruncate,
  ...labeledLinkProps
}: CidLinkProps) => {
  const { explorerUrl } = useEnvironment()
  const linkText = useMemo(
    () => (shouldTruncate ? truncateAddress(cid) : cid),
    [cid, shouldTruncate]
  )
  const href = `${explorerUrl}/message/?cid=${cid}`
  return (
    <LabeledLink
      href={href}
      linkText={linkText}
      copyText={cid}
      {...labeledLinkProps}
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
