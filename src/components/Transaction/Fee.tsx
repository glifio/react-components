import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { Message } from '@glif/filecoin-message'
import { FilecoinNumber } from '@glif/filecoin-number'
import Filecoin from '@glif/filecoin-wallet-provider'

import { getMaxAffordableFee } from '../../utils/getMaxAffordableFee'
import { getMaxGasFee } from '../../utils/getMaxGasFee'
import { useGetGasParams } from '../../utils/useGetGasParams'
import { FilecoinInput } from '../InputV2/Filecoin'
import { TransactionMaxFee } from './MaxFee'
import {
  Wallet,
  WALLET_PROPTYPE,
  FILECOIN_NUMBER_PROPTYPE
} from '../../customPropTypes'

export const TransactionFee = ({
  provider,
  message,
  wallet,
  sendAmount,
  disabled
}: TransactionFeeProps) => {
  // Input states
  const [txFee, setTxFee] = useState<FilecoinNumber | null>(null)
  const [isTxFeeValid, setIsTxFeeValid] = useState<boolean>(false)

  // Max transaction fee used for getting gas params. Will be
  // null until the user manually changes the transaction fee.
  const [maxFee, setMaxFee] = useState<FilecoinNumber | null>(null)

  // Load gas parameters when message or max fee changes
  const {
    gasParams,
    loading: gasParamsLoading,
    error: gasParamsError
  } = useGetGasParams(provider, message, maxFee)

  // Calculate max affordable fee (balance minus value)
  const maxAffordableFee = useMemo<FilecoinNumber | null>(() => {
    return sendAmount ? getMaxAffordableFee(wallet.balance, sendAmount) : null
  }, [sendAmount, wallet.balance])

  // Calculate maximum transaction fee (fee cap times limit)
  const calculatedMaxFee = useMemo<FilecoinNumber | null>(() => {
    return gasParams
      ? getMaxGasFee(gasParams.gasFeeCap, gasParams.gasLimit)
      : null
  }, [gasParams])

  // The first time we calculate a valid maximum transaction fee, we set the value
  // for the transaction fee input. Afterwards, the transaction fee input becomes
  // editable and the calculated fee is updated according to the user's input.
  const [initialFeeSet, setInitialFeeSet] = useState<boolean>(false)
  useEffect(() => {
    if (calculatedMaxFee && !initialFeeSet) {
      setInitialFeeSet(true)
      setTxFee(calculatedMaxFee)
    }
  }, [calculatedMaxFee, initialFeeSet])

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
      (!calculatedMaxFee || txFee.toAttoFil() !== calculatedMaxFee.toAttoFil())
    ) {
      setMaxFee(txFee)
    }
  }

  return (
    <>
      {initialFeeSet && (
        <FilecoinInput
          label='Transaction Fee'
          max={maxAffordableFee}
          value={txFee}
          denom='attofil'
          onBlur={onBlurTxFee}
          onChange={setTxFee}
          setIsValid={setIsTxFeeValid}
          disabled={disabled}
        />
      )}
      {gasParamsLoading && <p>Calculating transaction fees...</p>}
      {calculatedMaxFee && <TransactionMaxFee maxFee={calculatedMaxFee} />}
    </>
  )
}

export interface TransactionFeeProps {
  provider: Filecoin
  message: Message
  wallet: Wallet
  sendAmount: FilecoinNumber
  disabled: boolean
}

TransactionFee.propTypes = {
  provider: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  wallet: WALLET_PROPTYPE.isRequired,
  sendAmount: FILECOIN_NUMBER_PROPTYPE.isRequired,
  disabled: PropTypes.bool
}
