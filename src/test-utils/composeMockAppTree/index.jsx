/* eslint-disable react/prop-types */
import React from 'react'
import { CoinType } from '@glif/filecoin-address'
import theme from '../../components/theme'
import { ThemeProvider } from 'styled-components'
import { mockWalletProviderInstance } from '../../../__mocks__/@glif/filecoin-wallet-provider'
import WalletProviderWrapper from '../../services/WalletProvider'
import { initialState as walletProviderInitialState } from '../../services/WalletProvider/state'
import { composeWalletProviderState } from './composeState'
import { Environment, Network } from '../../services/EnvironmentProvider'

jest.mock('../../services/WalletProvider')

const Index = (statePreset = 'preOnboard', options = {}) => {
  // here you can pass a walletProviderInitialState and a preset to shape the store how you want it for testing
  const initialState = composeWalletProviderState(
    options?.walletProviderInitialState || walletProviderInitialState,
    statePreset
  )

  let walletProviderCache = { ...initialState }

  const cacheWalletProviderState = state => {
    walletProviderCache = { ...state }
    return <></>
  }

  const getWalletProviderState = () => walletProviderCache

  const Tree = ({ children }) => {
    return (
      <Environment
        coinType={CoinType.TEST}
        networkName={Network.CALIBRATION}
        nodeStatusApiKey='m787669344-2a9b90eb03dbff3e503c93c7'
        graphUrl='graph-calibration.glif.link/query'
        lotusApiUrl='https://api.calibration.node.glif.io/'
        explorerUrl='https://explorer-calibration.glif.link'
      >
        <WalletProviderWrapper
          options={options}
          statePreset={statePreset}
          getState={cacheWalletProviderState}
          initialState={initialState}
        >
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </WalletProviderWrapper>
      </Environment>
    )
  }

  return {
    Tree,
    walletProvider: mockWalletProviderInstance,
    getWalletProviderState
  }
}

/**
 * This function is a wrapper that mocks everything the filecoin app needs for testing
 *
 * VALID OPTIONS:
 * mockConverterInstance (an object that stubs the converter functionality)
 * walletProviderReducer (a reducer to stub the state handling of the wallet provider)
 * walletProviderInitialState(a reducer to stub the state of the walletProvider context)
 * walletProviderDispatch(a dispatcher to mock/read calls to the walletProvider's state)
 * pathname
 * query
 */

export default Index
