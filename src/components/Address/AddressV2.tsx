import styled from 'styled-components'
import PropTypes from 'prop-types'
import truncateAddress from '../../utils/truncateAddress'
import { SmartLink } from '../Link/SmartLink'
import { Box, Label, CopyText } from '..'

const AddressLink = styled(SmartLink)`
  color: var(--purple-medium);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const AddressV2 = ({ label, address, urlPrefix }: AddressV2Props) => {
  return (
    <Box color='core.darkgray'>
      <Label fontSize={1}>{label}</Label>
      <Box display='flex' flexDirection='row'>
        <AddressLink href={urlPrefix + address}>
          {truncateAddress(address)}
        </AddressLink>
        <CopyText text={address} hideCopyText />
      </Box>
    </Box>
  )
}

export interface AddressV2Props {
  label: string
  address: string
  urlPrefix: string
}

AddressV2.propTypes = {
  label: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  urlPrefix: PropTypes.string.isRequired
}
