import { FC } from 'react'
import { ButtonV2 } from '../../Button/V2'
import { SmartLink } from '../../Link/SmartLink'
import { ButtonRowCenter } from '../../Layout'
import {
  MetaMaskState,
  METAMASK_STATE_PROPTYPES
} from '../../../services/WalletProvider/metamaskUtils'

const Connecting: FC = () => {
  return <h2>Connecting to FILSnap</h2>
}

export const HelperText: FC<
  MetaMaskState & {
    onRetry: () => void
    back: () => void
    connectFILSnap: () => void
  }
> = ({
  extInstalled,
  extSupportsSnap,
  snapInstalled,
  loading,
  extUnlocked,
  snapEnabled,
  connectFILSnap,
  onRetry,
  back
}) => {
  if (loading) return <Connecting />
  if (!extInstalled)
    return (
      <>
        <h2>MetaMask not installed!</h2>
        <p>
          Please{' '}
          <SmartLink href='https://metamask.io/flask/'>
            install MetaMask
          </SmartLink>{' '}
          to get started
        </p>
        <ButtonRowCenter>
          <ButtonV2 large onClick={back}>
            Back
          </ButtonV2>
          <ButtonV2 large onClick={() => window.location.reload()}>
            Try again
          </ButtonV2>
        </ButtonRowCenter>
      </>
    )
  if (!extUnlocked)
    return (
      <>
        <h2>MetaMask locked!</h2>
        <p>Please unlock MetaMask to get started</p>
        <ButtonRowCenter>
          <ButtonV2 large onClick={back}>
            Back
          </ButtonV2>
          <ButtonV2 large onClick={onRetry}>
            Try again
          </ButtonV2>
        </ButtonRowCenter>
      </>
    )
  if (!extSupportsSnap)
    return (
      <>
        <h2>MetaMask doesn&apos;t support Snaps!</h2>
        <p>
          Please{' '}
          <SmartLink href='https://metamask.io/flask/'>
            upgrade MetaMask
          </SmartLink>{' '}
          to get started
        </p>
        <ButtonRowCenter>
          <ButtonV2 large onClick={back}>
            Back
          </ButtonV2>
          <ButtonV2 large onClick={onRetry}>
            Try again
          </ButtonV2>
        </ButtonRowCenter>
      </>
    )

  if (!snapInstalled)
    return (
      <>
        <h2>FILSnap not detected!</h2>
        <ButtonRowCenter>
          <ButtonV2 large onClick={back}>
            Back
          </ButtonV2>
          <ButtonV2 large onClick={connectFILSnap}>
            Connect FILSnap
          </ButtonV2>
        </ButtonRowCenter>
      </>
    )
  if (!snapEnabled)
    return (
      <>
        <h2>FILSnap disabled!</h2>
        <p>Please enable FILSnap in your MetaMask settings to continue.</p>
        <ButtonRowCenter>
          <ButtonV2 large onClick={back}>
            Back
          </ButtonV2>
          <ButtonV2 large onClick={onRetry}>
            Try again
          </ButtonV2>
        </ButtonRowCenter>
      </>
    )
  return <Connecting />
}

HelperText.propTypes = {
  ...METAMASK_STATE_PROPTYPES
}
