import { ApolloProvider } from '@apollo/client'
import { client } from '../apolloClient'
import theme from '../../theme'
import ThemeProvider from '../../ThemeProvider'

import Proposal from './Proposal'
import { Environment, Network } from '../../../services/EnvironmentProvider'
import { WALLET_ADDRESS, WALLET_ID } from '../../../test-utils/constants'

export default {
  title: 'ProposalHistory/Proposal',
  component: Proposal,
  decorators: [
    Story => (
      <Environment
        networkName={Network.CALIBRATION}
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

const Template = args => <Proposal {...args} />

export const Detail = Template.bind({})
Detail.args = {
  id: 8,
  msigAddress: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy',
  walletAddress: { robust: WALLET_ADDRESS, id: WALLET_ID },
  approve: console.log,
  cancel: console.log
}
