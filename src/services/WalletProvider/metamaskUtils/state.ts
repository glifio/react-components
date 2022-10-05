import PropTypes from 'prop-types'

export const initialMetaMaskState = {
  extInstalled: false,
  extUnlocked: false,
  extSupportsSnap: false,
  snapInstalled: false,
  snapEnabled: false,
  error: false,
  loading: true
}

export type MetaMaskState = typeof initialMetaMaskState

export function metamaskConfigurationFail(state: Partial<MetaMaskState>): {
  type: MetaMaskActionType
  payload: Partial<MetaMaskState>
} {
  return {
    type: 'METAMASK_CONFIGURED_FAIL',
    payload: { ...state }
  }
}

export type MetaMaskActionType =
  | 'METAMASK_RESET_STATE'
  | 'METAMASK_CONFIGURED_SUCCESS'
  | 'METAMASK_CONFIGURED_FAIL'

export const METAMASK_STATE_PROPTYPES = {
  extInstalled: PropTypes.bool.isRequired,
  extSupportsSnap: PropTypes.bool.isRequired,
  snapInstalled: PropTypes.bool.isRequired,
  snapEnabled: PropTypes.bool.isRequired,
  extUnlocked: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
}
