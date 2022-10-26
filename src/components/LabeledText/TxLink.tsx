import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useEnvironment } from '../../services/EnvironmentProvider'

import truncateAddress from '../../utils/truncateAddress'
import {
  LabeledLink,
  LabeledLinkProps,
  LabeledLinkPropTypes
} from './LabeledLink'

export const TxLink = ({
  txID,
  shouldTruncate,
  ...labeledLinkProps
}: TxLinkProps) => {
  const { explorerUrl } = useEnvironment()
  const linkText = useMemo(
    () => (shouldTruncate ? truncateAddress(txID) : txID),
    [txID, shouldTruncate]
  )
  const href = `${explorerUrl}/message/?txID=${txID}`
  return (
    <LabeledLink
      href={href}
      linkText={linkText}
      copyText={txID}
      {...labeledLinkProps}
    />
  )
}

export type TxLinkProps = {
  txID: string
  shouldTruncate?: boolean
} & Omit<LabeledLinkProps, 'href' | 'linkText' | 'copyText'>

const { href, linkText, copyText, ...txLinkPropTypes } = LabeledLinkPropTypes

TxLink.propTypes = {
  txID: PropTypes.string.isRequired,
  shouldTruncate: PropTypes.bool,
  ...txLinkPropTypes
}

TxLink.defaultProps = {
  shouldTruncate: true
}
