import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useEnvironment } from '../../services/EnvironmentProvider'

import truncateAddress from '../../utils/truncateAddress'
import {
  LabeledLink,
  LabeledLinkProps,
  LabeledLinkPropTypes
} from './LabeledLink'

export const MessageLink = ({
  cid,
  shouldTruncate,
  ...labeledLinkProps
}: MessageLinkProps) => {
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

export type MessageLinkProps = {
  cid?: string
  shouldTruncate?: boolean
} & Omit<LabeledLinkProps, 'href' | 'linkText' | 'copyText'>

const { href, linkText, copyText, ...messageLinkPropTypes } =
  LabeledLinkPropTypes

MessageLink.propTypes = {
  cid: PropTypes.string,
  shouldTruncate: PropTypes.bool,
  ...messageLinkPropTypes
}

MessageLink.defaultProps = {
  shouldTruncate: true
}
