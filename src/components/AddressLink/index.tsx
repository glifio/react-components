import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
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
  address,
  label,
  id,
  url,
  urlPrefix,
  hideCopy,
  hideCopyText,
  onClick
}: AddressLinkProps) => {
  const truncated = useMemo(
    () => (address ? truncateAddress(address) : ''),
    [address]
  )
  const linkText = id ? `(${id})` : truncated
  const linkHref = url || (urlPrefix ? urlPrefix + address : '')
  return (
    <Box>
      {label && (
        <Label color='core.darkgray' fontSize={1}>
          {label}
        </Label>
      )}
      <Box display='flex' flexDirection='row' gridGap='0.25em'>
        {id && <span>{truncated}</span>}
        {linkHref ? (
          <Link href={linkHref} onClick={onClick}>
            {linkText}
          </Link>
        ) : (
          <span>{linkText}</span>
        )}
        {!hideCopy && (
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
  address: string
  label?: string
  id?: string
  url?: string
  urlPrefix?: string
  hideCopy?: boolean
  hideCopyText?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

AddressLink.propTypes = {
  address: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
  urlPrefix: PropTypes.string,
  hideCopy: PropTypes.bool,
  hideCopyText: PropTypes.bool,
  onClick: PropTypes.func
}

AddressLink.defaultProps = {
  hideCopy: false,
  hideCopyText: true
}
