import { CoinType } from '@glif/filecoin-address'
import { ApolloProvider } from '@apollo/client'
import { client } from '../apolloClient'
import theme from '../../theme'
import ThemeProvider from '../../ThemeProvider'

import { ActorState } from '.'
import { Environment, Network } from '../../../services/EnvironmentProvider'

export default {
  title: 'ActorState/ActorState',
  component: ActorState,
  decorators: [
    Story => (
      <Environment
        networkName={Network.CALIBRATION}
        coinType={CoinType.TEST}
        nodeStatusApiKey='m787669344-2a9b90eb03dbff3e503c93c7'
        graphUrl='graph-calibration.glif.link/query'
        lotusApiUrl='https://api.calibration.node.glif.io/'
      >
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
        </ApolloProvider>
      </Environment>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <ActorState {...args} />

export const Base = Template.bind({})
Base.args = {
  address: 'f2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy'
}
