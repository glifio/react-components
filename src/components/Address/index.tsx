import styled from 'styled-components'
import PropTypes from 'prop-types'
import truncateAddress from '../../utils/truncateAddress'
import { SmartLink } from '../Link/SmartLink'
import { Label } from '../Typography'
import { CopyText } from '../Copy'
import Box from '../Box'

const AddressLink = styled(SmartLink)`
  color: var(--purple-medium);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const Address = ({ label, address, urlPrefix }: AddressProps) => {
  return (
    <Box color='core.darkgray'>
      <Label fontSize={1}>{label}</Label>
      <Box display='flex' flexDirection='row'>
        <AddressLink href={urlPrefix + address}>
          {address && truncateAddress(address)}
        </AddressLink>
        <CopyText text={address} hideCopyText />
      </Box>
    </Box>
  )
}

export interface AddressProps {
  label: string
  address: string
  urlPrefix: string
}

Address.propTypes = {
  label: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  urlPrefix: PropTypes.string.isRequired
}
