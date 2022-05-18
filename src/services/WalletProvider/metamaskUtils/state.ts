import { bool } from 'prop-types'

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
  extInstalled: bool.isRequired,
  extSupportsSnap: bool.isRequired,
  snapInstalled: bool.isRequired,
  snapEnabled: bool.isRequired,
  extUnlocked: bool.isRequired,
  loading: bool.isRequired,
  error: bool.isRequired
}
