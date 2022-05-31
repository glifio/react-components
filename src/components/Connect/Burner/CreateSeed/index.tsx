import React, { FC, useEffect, useState } from 'react'
import { number } from 'prop-types'
import Filecoin, { HDWalletProvider } from '@glif/filecoin-wallet-provider'
import { generateMnemonic } from '@zondax/filecoin-signing-tools/js'
import Box from '../../../Box'
import OnboardCard from '../../../Card/OnboardCard'
import StepHeader from '../../../StepHeader'
import LoadingScreen from '../../../LoadingScreen'

import {
  useWalletProvider,
  createWalletProvider
} from '../../../../services/WalletProvider'

import Walkthrough from './Walkthrough'
import { LoginOption } from '../../../../customPropTypes'
import { ButtonRowSpaced } from '../../../Layout'
import { ButtonV2 } from '../../../Button/V2'

const Create: FC<{
  // we pass this optional prop to make testing the core wallet functionality easier
  initialWalkthroughStep?: number
  back: () => void
  next: () => void
}> = ({ initialWalkthroughStep, back, next }) => {
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

  return (
    <>
      {loading || walkthroughStep === 4 ? (
        <LoadingScreen />
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault()
            nextStep()
          }}
        >
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <OnboardCard
              display='flex'
              flexDirection='row'
              flexWrap='wrap'
              justifyContent='center'
              maxWidth={16}
              border={0}
              css={`
                background-color: var(--blue-gray);
              `}
            >
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
            </OnboardCard>
            <ButtonRowSpaced>
              <ButtonV2
                type='button'
                onClick={() => {
                  if (walkthroughStep === 1) back()
                  else if (walkthroughStep === 2) setWalkthroughStep(1)
                }}
              >
                Back
              </ButtonV2>
              <input
                type='submit'
                className='large green'
                value={
                  walkthroughStep === 1
                    ? 'I&apos;ve recorded my seed phrase'
                    : 'Next'
                }
              />
            </ButtonRowSpaced>
          </Box>
        </form>
      )}
    </>
  )
}

Create.propTypes = {
  initialWalkthroughStep: number
}

Create.defaultProps = {
  initialWalkthroughStep: 1
}

export default Create
