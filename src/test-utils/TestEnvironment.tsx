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
    networkName={Network.WALLABY}
    nodeStatusApiKey={networks[Network.WALLABY].nodeStatusApiKey}
    graphUrl={networks[Network.WALLABY].graphUrl}
    graphSecure={networks[Network.WALLABY].graphSecure}
    lotusApiUrl={networks[Network.WALLABY].lotusApiUrl}
    explorerUrl='https://explorer.glif.io/wallaby'
    lotusApi={
      new LotusRPCEngine({
        apiAddress: networks[Network.WALLABY].lotusApiUrl
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
