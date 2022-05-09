import { FilecoinNumber } from '@glif/filecoin-number'
import { SmartLink } from '../Link/SmartLink'
import { FILECOIN_NUMBER_PROPTYPE } from '../../customPropTypes'

export const TransactionMaxFee = ({ maxFee }: TransactionMaxFeeProps) => {
  return (
    <p>
      You will not pay more than {maxFee.toFil()} FIL for this transaction.{' '}
      <SmartLink href='https://filfox.info/en/stats/gas'>
        More information on average gas fee statistics.
      </SmartLink>
    </p>
  )
}

export interface TransactionMaxFeeProps {
  maxFee: FilecoinNumber
}

TransactionMaxFee.propTypes = {
  maxFee: FILECOIN_NUMBER_PROPTYPE.isRequired
}
