import PropTypes from 'prop-types'
import { ButtonV2 } from '../../ButtonV2'
import { SmartLink } from '../../SmartLink'
import { ButtonRowCenter } from '../../Layout'
import {
  MetaMaskState,
  METAMASK_STATE_PROPTYPES
} from '../../../services/WalletProvider/metamaskUtils'

export const HelperText = ({
  extInstalled,
  extSupportsSnap,
  snapInstalled,
  loading,
  extUnlocked,
  snapEnabled,
  connectFILSnap,
  onRetry,
  back
}: HelperTextProps) => {
  if (loading) return <h2>Connecting to FILSnap</h2>
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
        <h2>MetaMask Snaps is pre-release software.</h2>
        <p>
          To try Snaps,{' '}
          <SmartLink href='https://metamask.io/flask/'>
            install MetaMask Flask
          </SmartLink>{' '}
          , a canary distribution for developers that provides access to
          upcoming features.
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
  return <h2>Connecting to FILSnap</h2>
}

type HelperTextProps = MetaMaskState & {
  connectFILSnap: () => void
  onRetry: () => void
  back: () => void
}

HelperText.propTypes = {
  ...METAMASK_STATE_PROPTYPES,
  connectFILSnap: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired
}
