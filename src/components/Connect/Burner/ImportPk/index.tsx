import React, { FC, useState } from 'react'
import Filecoin, { SECP256K1KeyProvider } from '@glif/filecoin-wallet-provider'

import Box from '../../../Box'
import Button from '../../../Button'
import OnboardCard from '../../../Card/OnboardCard'
import { Text, Title } from '../../../Typography'
import StepHeader from '../../../StepHeader'
import LoadingScreen from '../../../LoadingScreen'
import Input from '../../../Input'
import {
  createWalletProvider,
  useWalletProvider
} from '../../../../services/WalletProvider'
import BurnerWalletWarning from '../Warning'
import { LoginOption } from '../../../../customPropTypes'

const InputPrivateKey: FC<{ next: () => void; back: () => void }> = ({
  next,
  back
}) => {
  const {
    dispatch,
    fetchDefaultWallet,
    setLoginOption,
    walletList,
    lotusApiAddr
  } = useWalletProvider()
  const [privateKey, setPrivateKey] = useState('')
  const [privateKeyError, setPrivateKeyError] = useState('')
  const [loadingNextScreen, setLoadingNextScreen] = useState(false)
  const [acceptedWarning, setAcceptedWarning] = useState(false)

  const instantiateProvider = async () => {
    try {
      setLoadingNextScreen(true)
      setPrivateKey('')
      const provider = new Filecoin(new SECP256K1KeyProvider(privateKey), {
        apiAddress: lotusApiAddr
      })
      dispatch(createWalletProvider(provider, LoginOption.IMPORT_SINGLE_KEY))
      const wallet = await fetchDefaultWallet(provider)
      walletList([wallet])
      next()
    } catch (err) {
      setLoadingNextScreen(false)
      setPrivateKeyError(err.message || JSON.stringify(err))
    }
  }

  return (
    <>
      {acceptedWarning ? (
        <>
          {loadingNextScreen ? (
            <LoadingScreen />
          ) : (
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
            >
              <OnboardCard>
                <StepHeader
                  currentStep={1}
                  totalSteps={2}
                  description='Import'
                  glyphAcronym='Pk'
                  showStepper={false}
                />
                <Box
                  width='auto'
                  display='flex'
                  flexDirection='column'
                  justifyContent='space-between'
                  borderColor='core.lightgray'
                  m={2}
                >
                  <Title mt={3}>Import</Title>
                  <Text>Please input your private key below</Text>
                  <Input.PrivateKey
                    error={privateKeyError}
                    setError={setPrivateKeyError}
                    value={privateKey}
                    onChange={e => setPrivateKey(e.target.value)}
                  />
                </Box>
              </OnboardCard>
              <Box
                mt={6}
                display='flex'
                width='100%'
                justifyContent='space-between'
              >
                <Button
                  title='Back'
                  onClick={() => setLoginOption(null)}
                  variant='secondary'
                  mr={2}
                />
                <Button
                  title='Next'
                  disabled={!!(privateKey.length === 0 || privateKeyError)}
                  onClick={instantiateProvider}
                  variant='primary'
                  ml={2}
                />
              </Box>
            </Box>
          )}
        </>
      ) : (
        <BurnerWalletWarning
          back={back}
          next={() => setAcceptedWarning(true)}
        />
      )}
    </>
  )
}

export default InputPrivateKey
