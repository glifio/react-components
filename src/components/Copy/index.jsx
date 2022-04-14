import { string } from 'prop-types'
import Box from '../Box'
import { Title as AccountAddress } from '../Typography'
import truncate from '../../utils/truncateAddress'
import { ADDRESS_PROPTYPE_REQUIRED } from '../../customPropTypes'
import { CopyText } from './CopyText'

export * from './CopyText'

export const CopyAddress = ({ address, ...props }) => {
  return (
    <Box display='flex' alignItems='center' {...props}>
      <AccountAddress
        fontWeight={1}
        fontSize={3}
        margin={0}
        overflow='hidden'
        whiteSpace='nowrap'
      >
        {truncate(address)}
      </AccountAddress>
      <CopyText text={address} color={props.color} />
    </Box>
  )
}

CopyAddress.propTypes = {
  address: ADDRESS_PROPTYPE_REQUIRED,
  color: string
}

CopyAddress.defaultProps = {
  color: 'core.secondary'
}
