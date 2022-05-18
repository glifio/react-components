import { FC } from 'react'
import { ButtonV2 } from '../../Button/V2'
import { space } from '../../theme'
import { SmartLink } from '../../Link/SmartLink'
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
        <ButtonV2 mt={space('large')} onClick={() => window.location.reload()}>
          Try again
        </ButtonV2>
        <ButtonV2 mt={space('large')} onClick={back}>
          Back
        </ButtonV2>
      </>
    )
  if (!extUnlocked)
    return (
      <>
        <h2>MetaMask locked!</h2>
        <p>Please unlock MetaMask to get started</p>
        <ButtonV2 mt={space('large')} onClick={onRetry}>
          Try again
        </ButtonV2>
        <ButtonV2 mt={space('large')} onClick={back}>
          Back
        </ButtonV2>
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
        <ButtonV2 mt={space('large')} onClick={onRetry}>
          Try again
        </ButtonV2>
        <ButtonV2 mt={space('large')} onClick={back}>
          Back
        </ButtonV2>
      </>
    )

  if (!snapInstalled)
    return (
      <>
        <h2>FILSnap not detected!</h2>
        <ButtonV2 large mt={space('large')} onClick={connectFILSnap}>
          Connect FILSnap
        </ButtonV2>
        <ButtonV2 mt={space('large')} onClick={back}>
          Back
        </ButtonV2>
      </>
    )
  if (!snapEnabled)
    return (
      <>
        <h2>FILSnap disabled!</h2>
        <p>Please enable FILSnap in your MetaMask settings to continue.</p>
        <ButtonV2 mt={space('large')} onClick={onRetry}>
          Try again
        </ButtonV2>
        <ButtonV2 mt={space('large')} onClick={back}>
          Back
        </ButtonV2>
      </>
    )
  return <Connecting />
}

HelperText.propTypes = {
  ...METAMASK_STATE_PROPTYPES
}
