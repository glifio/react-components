import { ReactNode } from 'react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { CoinType } from '@glif/filecoin-address'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { Environment, Network, networks } from '../services/EnvironmentProvider'

const OptionalApolloMockProvider = ({ children, mocks, withApollo }) => {
  if (withApollo || mocks.length > 0)
    return <MockedProvider mocks={mocks}>{children}</MockedProvider>

  return <>{children}</>
}

export const TestEnvironment = ({
  children,
  withApollo,
  apolloMocks
}: TestEnvironmentProps) => (
  <Environment
    coinType={CoinType.TEST}
    networkName={Network.CALIBRATION}
    nodeStatusUrl={networks[Network.CALIBRATION].nodeStatusUrl}
    graphUrl={networks[Network.CALIBRATION].graphUrl}
    graphSecure={networks[Network.CALIBRATION].graphSecure}
    lotusApiUrl={networks[Network.CALIBRATION].lotusApiUrl}
    explorerUrl='https://explorer-calibration.glif.link'
    lotusApi={
      new LotusRPCEngine({
        apiAddress: networks[Network.CALIBRATION].lotusApiUrl
      })
    }
  >
    <OptionalApolloMockProvider withApollo={withApollo} mocks={apolloMocks}>
      {children}
    </OptionalApolloMockProvider>
  </Environment>
)

type TestEnvironmentProps = {
  children: ReactNode
  withApollo?: boolean
  apolloMocks?: MockedResponse[]
}

TestEnvironment.defaultProps = {
  withApollo: false,
  apolloMocks: []
}
