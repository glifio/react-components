import React, { FC } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ErrorBox as _ErrorBox } from '../../Layout'
import Box from '../../Box'
import {
  hasLedgerError,
  reportLedgerConfigError,
  LedgerState,
  LEDGER_STATE_PROPTYPES
} from '../../../services/WalletProvider/ledgerUtils'
import { space } from '../../theme'

const ErrorBox = styled(_ErrorBox)`
  width: 560px;
  gap: ${space()};
  margin-bottom: ${space()};
`

const Helper: FC<HelperProps> = ({ ...errors }) => (
  <Box>
    {hasLedgerError({
      ...errors
    }) ? (
      <ErrorBox>
        <p>{reportLedgerConfigError({ ...errors })}</p>
        {errors.inUseByAnotherApp && (
          <p>(Most of the time, this is Ledger Live!)</p>
        )}
      </ErrorBox>
    ) : null}
  </Box>
)

type HelperProps = LedgerState & { otherError?: string }

Helper.propTypes = {
  ...LEDGER_STATE_PROPTYPES,
  otherError: PropTypes.string
}

Helper.defaultProps = {
  otherError: ''
}

export default Helper
