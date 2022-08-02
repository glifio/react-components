import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Filecoin, { HDWalletProvider } from '@glif/filecoin-wallet-provider'
import { generateMnemonic } from '@zondax/filecoin-signing-tools/js'
import StepHeader from '../../../StepHeader'
import { LoadingScreen } from '../../../Loading/LoadingScreen'

import {
  useWalletProvider,
  createWalletProvider
} from '../../../../services/WalletProvider'

import Walkthrough from './Walkthrough'
import { LoginOption } from '../../../../customPropTypes'
import { ButtonRowSpaced, WideDialog, ShadowBox } from '../../../Layout'
import { ButtonV2 } from '../../../Button/V2'

export const CreateSeed = ({
  initialWalkthroughStep,
  back,
  next
}: CreateSeedProps) => {
  const [mnemonic, setMnemonic] = useState('')
  const [walkthroughStep, setWalkthroughStep] = useState(initialWalkthroughStep)
  const [loading, setLoading] = useState(true)
  const [canContinue, setCanContinue] = useState(false)
  const [importSeedError, setImportSeedError] = useState(false)
  const { dispatch, fetchDefaultWallet, walletList, lotusApiAddr } =
    useWalletProvider()

  const nextStep = () => {
    setImportSeedError(false)
    if (walkthroughStep === 1) setWalkthroughStep(2)
    else if (walkthroughStep === 2 && canContinue) setWalkthroughStep(3)
    else if (walkthroughStep === 2) setImportSeedError(true)
    else if (walkthroughStep >= 3) setWalkthroughStep(walkthroughStep + 1)
  }

  useEffect(() => {
    setMnemonic(generateMnemonic())
    setLoading(false)
  }, [setMnemonic, setLoading])

  useEffect(() => {
    const instantiateProvider = async () => {
      try {
        const provider = new Filecoin(new HDWalletProvider(mnemonic), {
          apiAddress: lotusApiAddr
        })
        dispatch(createWalletProvider(provider, LoginOption.CREATE_MNEMONIC))
        const wallet = await fetchDefaultWallet(provider)
        walletList([wallet])
        next()
      } catch (err) {
        setImportSeedError(err.message || JSON.stringify(err))
      }
    }
    if (walkthroughStep === 4 && !loading) {
      setLoading(true)
      instantiateProvider()
    }
  }, [
    dispatch,
    fetchDefaultWallet,
    mnemonic,
    walkthroughStep,
    loading,
    walletList,
    next,
    lotusApiAddr
  ])

  return loading || walkthroughStep === 4 ? (
    <LoadingScreen />
  ) : (
    <WideDialog>
      <form
        onSubmit={e => {
          e.preventDefault()
          nextStep()
        }}
      >
        <ShadowBox>
          <StepHeader currentStep={walkthroughStep} totalSteps={3} />
          {mnemonic && (
            <Walkthrough
              importSeedError={importSeedError}
              canContinue={canContinue}
              walkthroughStep={walkthroughStep}
              mnemonic={mnemonic}
              setCanContinue={setCanContinue}
            />
          )}
        </ShadowBox>
        <ButtonRowSpaced>
          <ButtonV2
            large
            type='button'
            onClick={() =>
              walkthroughStep === 1
                ? back()
                : setWalkthroughStep(walkthroughStep - 1)
            }
          >
            Back
          </ButtonV2>
          <ButtonV2 large green type='submit'>
            {walkthroughStep === 1 ? "I've recorded my seed phrase" : 'Next'}
          </ButtonV2>
        </ButtonRowSpaced>
      </form>
    </WideDialog>
  )
}

export interface CreateSeedProps {
  // we pass this optional prop to make testing the core wallet functionality easier
  initialWalkthroughStep?: number
  back: () => void
  next: () => void
}

CreateSeed.propTypes = {
  initialWalkthroughStep: PropTypes.number,
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}

CreateSeed.defaultProps = {
  initialWalkthroughStep: 1
}
