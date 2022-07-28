import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMemo, useCallback, MouseEvent } from 'react'
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
  stopPropagation,
  hideCopy,
  hideCopyText
}: AddressLinkProps) => {
  // prioritize robust > id, use id if no robust exists
  const linkText = useMemo(
    () => (address ? truncateAddress(address) : id || ''),
    [address, id]
  )
  const linkHref = `${explorerUrl}/actor/?address=${address || id}`
  const onClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) =>
      stopPropagation && e.stopPropagation(),
    [stopPropagation]
  )
  return (
    <LabeledText label={label} text={disableLink ? linkText : ''}>
      <AddressLinkEl color={color}>
        {!disableLink && (
          <SmartLink href={linkHref} onClick={onClick}>
            {linkText}
          </SmartLink>
        )}
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
  stopPropagation: boolean
  hideCopy: boolean
  hideCopyText: boolean
}

AddressLink.propTypes = {
  id: PropTypes.string,
  address: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  disableLink: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  hideCopy: PropTypes.bool,
  hideCopyText: PropTypes.bool
}

AddressLink.defaultProps = {
  color: 'var(--purple-medium)',
  disableLink: false,
  stopPropagation: true,
  hideCopy: false,
  hideCopyText: true
}
