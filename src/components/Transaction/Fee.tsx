import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'

import { Toggle } from '../InputV2/Toggle'
import { FilecoinInput } from '../InputV2/Filecoin'
import { TransactionMaxFee } from './MaxFee'
import { FILECOIN_NUMBER_PROPTYPE } from '../../customPropTypes'

export const TransactionFee = ({
  maxFee,
  setMaxFee,
  affordableFee,
  calculatedFee,
  gasLoading,
  disabled
}: TransactionFeeProps) => {
  // Input states
  const [expert, setExpert] = useState<boolean>(false)
  const [txFee, setTxFee] = useState<FilecoinNumber | null>(null)
  const [isTxFeeValid, setIsTxFeeValid] = useState<boolean>(false)

  // When leaving the transaction fee input, we set maxFee to
  // update the gas params if the following conditions are met:
  // - the input is valid
  // - the value is different from the previous max fee
  // - the value is different from the calculated max fee
  const onBlurTxFee = () => {
    if (
      txFee &&
      isTxFeeValid &&
      (!maxFee || txFee.toAttoFil() !== maxFee.toAttoFil()) &&
      (!calculatedFee || txFee.toAttoFil() !== calculatedFee.toAttoFil())
    ) {
      setMaxFee(txFee)
    }
  }

  // When enabling expert mode, set TX fee input value
  // When disabling expert mode, reset to default TX fee
  useEffect(
    () => (expert ? calculatedFee && setTxFee(calculatedFee) : setMaxFee(null)),
    [expert, calculatedFee, setMaxFee]
  )

  return (
    <>
      {(gasLoading || calculatedFee) && (
        <>
          <Toggle
            label='Expert Mode'
            checked={expert}
            onChange={setExpert}
            disabled={gasLoading || disabled}
          />
          {expert && (
            <FilecoinInput
              label='Transaction Fee'
              max={affordableFee}
              value={txFee}
              denom='attofil'
              onBlur={onBlurTxFee}
              onChange={setTxFee}
              setIsValid={setIsTxFeeValid}
              disabled={gasLoading || disabled}
            />
          )}
        </>
      )}
      {gasLoading && <p>Calculating transaction fees...</p>}
      {calculatedFee && <TransactionMaxFee maxFee={calculatedFee} />}
    </>
  )
}

export interface TransactionFeeProps {
  maxFee: FilecoinNumber
  setMaxFee: (maxFee: FilecoinNumber) => void
  affordableFee: FilecoinNumber
  calculatedFee: FilecoinNumber
  gasLoading: boolean
  disabled: boolean
}

TransactionFee.propTypes = {
  maxFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  setMaxFee: PropTypes.func.isRequired,
  affordableFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  calculatedFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  gasLoading: PropTypes.bool,
  disabled: PropTypes.bool
}
