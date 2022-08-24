import React from 'react'
import { CoinType } from '@glif/filecoin-address'
import { Environment, Network, networks } from '../services/EnvironmentProvider'

export const TestEnvironment = ({ children }) => (
  <Environment
    coinType={CoinType.TEST}
    networkName={Network.CALIBRATION}
    nodeStatusApiKey={networks[Network.CALIBRATION].nodeStatusApiKey}
    graphUrl={networks[Network.CALIBRATION].graphUrl}
    lotusApiUrl='https://api.calibration.node.glif.io/'
    explorerUrl='https://explorer-calibration.glif.link'
  >
    {children}
  </Environment>
)
