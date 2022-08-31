import React from 'react'
import { CoinType } from '@glif/filecoin-address'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { Environment, Network, networks } from '../services/EnvironmentProvider'

export const TestEnvironment = ({ children }) => (
  <Environment
    coinType={CoinType.TEST}
    networkName={Network.WALLABY}
    nodeStatusApiKey={networks[Network.WALLABY].nodeStatusApiKey}
    graphUrl={networks[Network.WALLABY].graphUrl}
    lotusApiUrl={networks[Network.WALLABY].lotusApiUrl}
    explorerUrl='https://explorer-calibration.glif.link'
    lotusApi={
      new LotusRPCEngine({
        apiAddress: networks[Network.CALIBRATION].lotusApiUrl
      })
    }
  >
    {children}
  </Environment>
)
