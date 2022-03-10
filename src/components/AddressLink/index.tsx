import styled from 'styled-components'
import PropTypes from 'prop-types'
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
  urlPrefix
}: AddressLinkProps) => {
  return (
    <Box>
      {label && <Label color='core.darkgray' fontSize={1}>{label}</Label>}
      <Box display='flex' flexDirection='row' gridGap='0.25em'>
        <Link href={url || urlPrefix + address}>
          {address && truncateAddress(address)}
        </Link>
        {id && <span>({id})</span>}
        <CopyText text={address} hideCopyText />
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
}

AddressLink.propTypes = {
  address: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
  urlPrefix: PropTypes.string
}
