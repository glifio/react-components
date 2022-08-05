import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

import truncateAddress from '../../utils/truncateAddress'
import { LabeledText } from '.'
import { SmartLink } from '../Link/SmartLink'
import { CopyText } from '../Copy'

const AddressLinkEl = styled.div`
  display: flex;
  grid-gap: 0.25em;
  line-height: 1.5;

  a {
    color: ${props => props.color};
    text-decoration: none;
    &:hover {
      color: ${props => props.color};
      text-decoration: underline;
    }
  }
`

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
  shouldTruncate
}: AddressLinkProps) => {
  // prioritize robust > id, use id if no robust exists
  const linkText = useMemo(() => {
    if (address) {
      return shouldTruncate ? truncateAddress(address) : address
    } else if (id) {
      return id
    }
    return ''
  }, [address, id, shouldTruncate])
  const linkHref = `${explorerUrl}/actor/?address=${address || id}`
  return (
    <LabeledText label={label} text={disableLink ? linkText : ''}>
      <AddressLinkEl color={color}>
        {!disableLink && <SmartLink href={linkHref}>{linkText}</SmartLink>}
        {!hideCopy && (address || id) && (
          <CopyText
            text={address || id}
            hideCopyText={hideCopyText}
            color={color}
          />
        )}
      </AddressLinkEl>
    </LabeledText>
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
}

AddressLink.propTypes = {
  id: PropTypes.string,
  address: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  disableLink: PropTypes.bool,
  hideCopy: PropTypes.bool,
  hideCopyText: PropTypes.bool,
  shouldTruncate: PropTypes.bool
}

AddressLink.defaultProps = {
  color: 'var(--purple-medium)',
  disableLink: false,
  hideCopy: false,
  hideCopyText: true,
  shouldTruncate: true
}
