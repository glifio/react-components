import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMemo, useCallback } from 'react'
import truncateAddress from '../../utils/truncateAddress'
import { SmartLink } from '../Link/SmartLink'
import { CopyText } from '../Copy'

const Label = styled.h4`
  margin: 0;
  color: var(--gray-dark);
`

const Link = styled(SmartLink)`
  color: ${props => props.color};
  text-decoration: none;
  &:hover {
    color: ${props => props.color};
    text-decoration: underline;
  }
`

const AddressWrap = styled.div`
  display: flex;
  flexdirection: row;
  grid-gap: 0.25em;
  line-height: ${props => props.hideCopy && '1.5'};
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
  const linkText = useMemo(() => {
    if (address) return truncateAddress(address)
    else if (id) return id

    return ''
  }, [address, id])

  const linkHref = `${explorerUrl}/actor/?address=${address || id}`
  const onClick = useCallback(
    (e: MouseEvent) => stopPropagation && e.stopPropagation(),
    [stopPropagation]
  )
  return (
    <div>
      {label && <Label>{label}</Label>}
      <AddressWrap hideCopy={hideCopy}>
        {disableLink ? (
          <span>{linkText}</span>
        ) : (
          <Link color={color} href={linkHref} onClick={onClick}>
            {linkText}
          </Link>
        )}
        {!hideCopy && (address || id) && (
          <CopyText
            text={address || id}
            hideCopyText={hideCopyText}
            color={color}
          />
        )}
      </AddressWrap>
    </div>
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
