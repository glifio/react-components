import PropTypes from 'prop-types'
import { useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'

import { Toggle } from '../InputV2/Toggle'
import { FilecoinInput } from '../InputV2/Filecoin'
import { TransactionMaxFee } from './MaxFee'
import {
  FILECOIN_NUMBER_PROPTYPE,
  TxState,
  TX_STATE_PROPTYPE
} from '../../customPropTypes'

export const TransactionFee = ({
  inputFee,
  setInputFee,
  affordableFee,
  calculatedFee,
  txState
}: TransactionFeeProps) => {
  // Input states
  const [expertMode, setExpertMode] = useState<boolean>(false)
  const [localFee, setLocalFee] = useState<FilecoinNumber | null>(null)
  const [isLocalFeeValid, setIsLocalFeeValid] = useState<boolean>(false)

  // When leaving the tx fee input or pressing Enter, we set inputFee
  // to update the gas params if the following conditions are met:
  // - the input is valid
  // - the value is different from the previous max fee
  // - the value is different from the calculated max fee
  const setMaxFeeIfChanged = () => {
    if (
      localFee &&
      isLocalFeeValid &&
      (!inputFee || localFee.toAttoFil() !== inputFee.toAttoFil()) &&
      (!calculatedFee || localFee.toAttoFil() !== calculatedFee.toAttoFil())
    ) {
      setInputFee(localFee)
    }
  }

  // When enabling expert mode, set TX fee input value
  // When disabling expert mode, reset to default TX fee
  const onChangeExpertToggle = (checked: boolean) => {
    checked ? setLocalFee(calculatedFee) : setInputFee(null)
    setExpertMode(checked)
  }

  return (
    <>
      {txState >= TxState.FillingTxFee && (
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
              max={affordableFee}
              value={localFee}
              denom='attofil'
              onBlur={setMaxFeeIfChanged}
              onEnter={setMaxFeeIfChanged}
              onChange={setLocalFee}
              setIsValid={setIsLocalFeeValid}
              disabled={txState !== TxState.FillingTxFee}
            />
          )}
        </>
      )}
      {txState === TxState.LoadingTxFee && (
        <p>Calculating transaction fees...</p>
      )}
      {calculatedFee && <TransactionMaxFee maxFee={calculatedFee} />}
    </>
  )
}

export interface TransactionFeeProps {
  inputFee: FilecoinNumber
  setInputFee: (inputFee: FilecoinNumber) => void
  affordableFee: FilecoinNumber
  calculatedFee: FilecoinNumber
  txState: TxState
}

TransactionFee.propTypes = {
  inputFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  setInputFee: PropTypes.func.isRequired,
  affordableFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  calculatedFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  txState: TX_STATE_PROPTYPE.isRequired
}
