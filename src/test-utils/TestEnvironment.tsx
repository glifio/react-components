import React from 'react'
import { CoinType } from '@glif/filecoin-address'
import { Environment, Network } from '../services/EnvironmentProvider'

export const TestEnvironment = ({ children }) => (
  <Environment
    coinType={CoinType.TEST}
    networkName={Network.CALIBRATION}
    nodeStatusApiKey='m787669344-2a9b90eb03dbff3e503c93c7'
    graphUrl='graph-calibration.glif.link/query'
    lotusApiUrl='https://api.calibration.node.glif.io/'
    explorerUrl='https://explorer-calibration.glif.link'
  >
    {children}
  </Environment>
)
