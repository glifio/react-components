import PropTypes from 'prop-types'
import { useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'

import { SmartLink } from '../Link/SmartLink'
import { Toggle } from '../InputV2/Toggle'
import { ButtonInput } from '../InputV2/Button'
import { FilecoinInput } from '../InputV2/Filecoin'
import {
  FILECOIN_NUMBER_PROPTYPE,
  TxState,
  TX_STATE_PROPTYPE
} from '../../customPropTypes'

export const TransactionFee = ({
  inputFee,
  setInputFee,
  maxFee,
  txFee,
  txState,
  onUpdate
}: TransactionFeeProps) => {
  // Input states
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [expertMode, setExpertMode] = useState<boolean>(false)
  const [isInputFeeValid, setIsInputFeeValid] = useState<boolean>(false)

  // When enabling expert mode, set TX fee input to current value
  // When disabling expert mode, clear TX fee input
  const onChangeExpertToggle = (checked: boolean) => {
    setInputFee(checked ? txFee : null)
    setIsDirty(false)
    setExpertMode(checked)
  }

  const onChangeTxFee = (fee: FilecoinNumber) => {
    setInputFee(fee)
    setIsDirty(true)
  }

  const onClickUpdate = () => {
    setIsDirty(false)
    onUpdate()
  }

  return (
    txState >= TxState.FillingTxFee && (
      <>
        <Toggle
          label='Expert Mode'
          checked={expertMode}
          onChange={onChangeExpertToggle}
          disabled={txState !== TxState.FillingTxFee}
        />
        {expertMode && (
          <FilecoinInput
            label='Transaction Fee'
            max={maxFee}
            value={inputFee}
            denom='attofil'
            onChange={onChangeTxFee}
            setIsValid={setIsInputFeeValid}
            disabled={txState !== TxState.FillingTxFee}
          />
        )}
        {isDirty && (
          <ButtonInput
            label='Update Transaction Fee'
            value='Update'
            onClick={onClickUpdate}
            disabled={!isInputFeeValid || txState !== TxState.FillingTxFee}
          />
        )}
        {txState === TxState.LoadingTxFee && (
          <p>Calculating transaction fees...</p>
        )}
        {txFee && (
          <p>
            You will not pay more than {txFee.toFil()} FIL for this transaction.{' '}
            <SmartLink href='https://filfox.info/en/stats/gas'>
              More information on average gas fee statistics.
            </SmartLink>
          </p>
        )}
      </>
    )
  )
}

export interface TransactionFeeProps {
  inputFee: FilecoinNumber
  setInputFee: (inputFee: FilecoinNumber) => void
  maxFee: FilecoinNumber
  txFee: FilecoinNumber
  txState: TxState
  onUpdate: () => void
}

TransactionFee.propTypes = {
  inputFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  setInputFee: PropTypes.func.isRequired,
  maxFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  txFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  txState: TX_STATE_PROPTYPE.isRequired,
  onUpdate: PropTypes.func.isRequired
}
