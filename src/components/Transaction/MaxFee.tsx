import { FilecoinNumber } from '@glif/filecoin-number'
import { FILECOIN_NUMBER_PROPTYPE, SmartLink } from '@glif/react-components'

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

interface TransactionMaxFeeProps {
  maxFee: FilecoinNumber
}

TransactionMaxFee.propTypes = {
  maxFee: FILECOIN_NUMBER_PROPTYPE.isRequired
}
