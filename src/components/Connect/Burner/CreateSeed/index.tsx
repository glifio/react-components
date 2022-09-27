import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import Filecoin, { HDWalletProvider } from '@glif/filecoin-wallet-provider'
import { generateMnemonic } from '@zondax/filecoin-signing-tools/js'

import { LoadingScreen } from '../../../Loading/LoadingScreen'
import { Walkthrough } from './Walkthrough'
import { LoginOption } from '../../../../customPropTypes'
import { ButtonV2 } from '../../../Button/V2'
import { Stepper } from '../../../Stepper'
import { ErrorView } from '../../../ErrorView'
import { ButtonRowSpaced, WideDialog, ShadowBox } from '../../../Layout'
import {
  useWalletProvider,
  createWalletProvider
} from '../../../../services/WalletProvider'

export const CreateSeed = ({
  testMnemonic,
  initialStep,
  back,
  next
}: CreateSeedProps) => {
  const mnemonic = useRef<string>(testMnemonic || generateMnemonic())
  const [step, setStep] = useState<number>(initialStep || 1)
  const [valid, setValid] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [walletError, setWalletError] = useState<string>('')
  const { dispatch, fetchDefaultWallet, walletList, lotusApiAddr } =
    useWalletProvider()

  // Prevent going to step 3 until all words are valid
  const nextDisabled = step === 2 && !valid

  // Creates a wallet using the generated seed phrase
  const createWallet = useCallback(async () => {
    const subProvider = new HDWalletProvider(mnemonic.current)
    const provider = new Filecoin(subProvider, { apiAddress: lotusApiAddr })
    dispatch(createWalletProvider(provider, LoginOption.CREATE_MNEMONIC))
    walletList([await fetchDefaultWallet(provider)])
  }, [lotusApiAddr, dispatch, fetchDefaultWallet, walletList])

  // Create the wallet when going to step 4
  useEffect(() => {
    if (step === 4 && !loading) {
      setLoading(true)
      createWallet()
        .then(() => next())
        .catch(e => setWalletError(e.message))
    }
  }, [step, loading, createWallet, next])

  return walletError ? (
    <ErrorView title='Wallet creation failed' description={walletError} />
  ) : loading ? (
    <LoadingScreen />
  ) : (
    <WideDialog>
      <form
        onSubmit={e => {
          e.preventDefault()
          !nextDisabled && setStep(step + 1)
        }}
      >
        <ShadowBox>
          <Stepper step={step} steps={3} />
          <Walkthrough
            mnemonic={mnemonic.current}
            step={step}
            onValidChange={setValid}
          />
        </ShadowBox>
        <ButtonRowSpaced>
          <ButtonV2
            large
            type='button'
            onClick={() => (step === 1 ? back() : setStep(step - 1))}
          >
            Back
          </ButtonV2>
          <ButtonV2 large green type='submit' disabled={nextDisabled}>
            {step === 1 ? "I've recorded my seed phrase" : 'Next'}
          </ButtonV2>
        </ButtonRowSpaced>
      </form>
    </WideDialog>
  )
}

export interface CreateSeedProps {
  testMnemonic?: string // for tests / stories
  initialStep?: number // for tests / stories
  back: () => void
  next: () => void
}

CreateSeed.propTypes = {
  testMnemonic: PropTypes.string,
  initialStep: PropTypes.number,
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}
