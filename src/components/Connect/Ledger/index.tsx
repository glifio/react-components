import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '../../Box'
import Button from '../../Button'
import OnboardCard from '../../Card/OnboardCard'
import { Text, Title } from '../../Typography'
import StepHeader from '../../StepHeader'
import { StyledATag } from '../../Link'
import { IconLedger } from '../../Icons'
import {
  useWalletProvider,
  createWalletProvider
} from '../../../services/WalletProvider'
import {
  hasLedgerError,
  reportLedgerConfigError,
  LedgerState,
  LEDGER_STATE_PROPTYPES
} from '../../../services/WalletProvider/ledgerUtils'
import { LoginOption } from '../../../customPropTypes'

const Helper: FC<LedgerState & { otherError: string }> = ({ ...errors }) => (
  <Box
    display='flex'
    flexDirection='column'
    justifyContent='space-around'
    borderColor='silver'
    width='100%'
    minHeight={9}
    mt={4}
  >
    {hasLedgerError({
      ...errors
    }) ? (
      <>
        <Box display='flex' alignItems='center' color='status.fail.foreground'>
          <Title>Oops!</Title>
        </Box>
        <Box mt={3} color='status.fail.foreground'>
          <Text>{reportLedgerConfigError({ ...errors })}</Text>
          {errors.inUseByAnotherApp && (
            <Text>(Most of the time, this is Ledger Live!)</Text>
          )}
        </Box>
      </>
    ) : (
      <>
        <Box display='flex' alignItems='center' color='core.nearblack'>
          <Title>Unlock & Open</Title>
        </Box>
        <Box color='core.nearblack' mt={3}>
          <Text>
            Please unlock your Ledger device and open the Filecoin App
          </Text>

          <StyledATag
            fontSize={2}
            target='_blank'
            rel='noopener noreferrer'
            href='https://reading.supply/@glif/install-the-filecoin-app-on-your-ledger-device-y33vhX'
          >
            Click here for installation instructions.
          </StyledATag>
        </Box>
      </>
    )}
  </Box>
)

Helper.propTypes = {
  ...LEDGER_STATE_PROPTYPES,
  otherError: PropTypes.string
}

Helper.defaultProps = {
  otherError: ''
}

const ConnectLedger: FC<{ next: () => void; back: () => void }> = ({
  next,
  back
}) => {
  const { connectLedger, dispatch, ledger, fetchDefaultWallet, walletList } =
    useWalletProvider()
  const [uncaughtError, setUncaughtError] = useState('')
  const [loading, setLoading] = useState(false)
  const error = hasLedgerError({
    ...ledger,
    otherError: uncaughtError
  })

  const onClick = async () => {
    setLoading(true)
    setUncaughtError('')
    try {
      const provider = await connectLedger()
      if (provider) {
        dispatch(createWalletProvider(provider, LoginOption.LEDGER))
        const wallet = await fetchDefaultWallet(provider)
        if (wallet) {
          walletList([wallet])
          next()
        }
      }
    } catch (err) {
      setUncaughtError(err?.message || err.toString())
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      width='100%'
      maxWidth={13}
    >
      <OnboardCard
        maxWidth={13}
        width='100%'
        minHeight={9}
        borderColor={error && 'status.fail.background'}
        bg={error ? 'status.fail.background' : 'core.transparent'}
      >
        <StepHeader
          loading={!ledger.userImportFailure && loading}
          showStepper={false}
          Icon={IconLedger}
          error={!!error}
        />
        <Helper otherError={uncaughtError} {...ledger} />
      </OnboardCard>
      <Box
        mt={6}
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        width='100%'
      >
        <Button title='Back' onClick={back} variant='secondary' mr={2} />
        <Button
          title='My Ledger device is unlocked & Filecoin app open'
          onClick={onClick}
          disabled={loading}
          variant='primary'
          ml={2}
        />
      </Box>
    </Box>
  )
}

export default ConnectLedger
