import PropTypes from 'prop-types'
import { ErrorBox } from '../../Layout'
import {
  hasLedgerError,
  reportLedgerConfigError,
  LedgerState,
  LEDGER_STATE_PROPTYPES
} from '../../../services/WalletProvider/ledgerUtils'

export const LedgerError = ({ ...errors }: LedgerErrorProps) =>
  hasLedgerError({ ...errors }) && (
    <ErrorBox>
      <p>{reportLedgerConfigError({ ...errors })}</p>
      {errors.inUseByAnotherApp && (
        <p>(Most of the time, this is Ledger Live!)</p>
      )}
    </ErrorBox>
  )

export type LedgerErrorProps = LedgerState & { otherError?: string }

LedgerError.propTypes = {
  ...LEDGER_STATE_PROPTYPES,
  otherError: PropTypes.string
}

LedgerError.defaultProps = {
  otherError: ''
}
