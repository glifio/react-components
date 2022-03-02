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

export const AddressV2 = ({ address, label }: AddressV2Props) => {
  const href = `${process.env.NEXT_PUBLIC_EXPLORER_URL}/address/${address}`;
  return (
    <Box color='core.darkgray'>
      <Label fontSize={1}>{label}</Label>
      <Box display='flex' flexDirection='row'>
        <AddressLink href={href}>
          {truncateAddress(address)}
        </AddressLink>
        <CopyText text={address} hideCopyText />
      </Box>
    </Box>
  )
}

interface AddressV2Props {
  address: string
  label: string
}

AddressV2.propTypes = {
  address: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
