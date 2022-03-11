import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMemo, useCallback } from 'react'
import truncateAddress from '../../utils/truncateAddress'
import { SmartLink } from '../Link/SmartLink'
import { Label } from '../Typography'
import { CopyText } from '../Copy'
import Box from '../Box'

const Link = styled(SmartLink)`
  color: var(--purple-medium);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const AddressLink = ({
  id,
  address,
  label,
  disableLink,
  stopPropagation,
  hideCopy,
  hideCopyText
}: AddressLinkProps) => {
  const truncated = useMemo(
    () => (address ? truncateAddress(address) : ''),
    [address]
  )
  const explorerUrl =
    process.env.NEXT_PUBLIC_EXPLORER_URL ||
    'https://explorer-calibration.glif.link'
  const linkText = truncated && id ? `(${id})` : id || truncated
  const linkHref = `${explorerUrl}/actor/?address=${id || address}`
  const onClick = useCallback(
    (e: MouseEvent) => stopPropagation && e.stopPropagation(),
    [stopPropagation]
  )
  return (
    <Box>
      {label && (
        <Label color='core.darkgray' fontSize={1}>
          {label}
        </Label>
      )}
      <Box display='flex' flexDirection='row' gridGap='0.25em'>
        {truncated && id && <span>{truncated}</span>}
        {disableLink ? (
          <span>{linkText}</span>
        ) : (
          <Link href={linkHref} onClick={onClick}>
            {linkText}
          </Link>
        )}
        {!hideCopy && address && (
          <CopyText
            text={address}
            hideCopyText={hideCopyText}
            color='inherit'
          />
        )}
      </Box>
    </Box>
  )
}

export interface AddressLinkProps {
  id?: string
  address?: string
  label?: string
  disableLink: boolean
  stopPropagation: boolean
  hideCopy: boolean
  hideCopyText: boolean
}

AddressLink.propTypes = {
  id: PropTypes.string,
  address: PropTypes.string,
  label: PropTypes.string,
  disableLink: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  hideCopy: PropTypes.bool,
  hideCopyText: PropTypes.bool
}

AddressLink.defaultProps = {
  disableLink: false,
  stopPropagation: true,
  hideCopy: false,
  hideCopyText: true
}
