import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useEnvironment } from '../../services/EnvironmentProvider'

import { truncateString } from '../../utils/truncateString'
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
    () => (shouldTruncate ? truncateString(txID) : txID),
    [txID, shouldTruncate]
  )
  const href = `${explorerUrl}/tx/${txID}`
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
