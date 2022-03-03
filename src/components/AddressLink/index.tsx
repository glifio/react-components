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
  label,
  address,
  urlPrefix
}: AddressLinkProps) => {
  return (
    <Box color='core.darkgray'>
      <Label fontSize={1}>{label}</Label>
      <Box display='flex' flexDirection='row'>
        <Link href={urlPrefix + address}>
          {address && truncateAddress(address)}
        </Link>
        <CopyText text={address} hideCopyText />
      </Box>
    </Box>
  )
}

export interface AddressLinkProps {
  label: string
  address: string
  urlPrefix: string
}

AddressLink.propTypes = {
  label: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  urlPrefix: PropTypes.string.isRequired
}
