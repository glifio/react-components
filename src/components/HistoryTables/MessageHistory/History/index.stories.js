import { ApolloProvider } from '@apollo/client'
import { client } from '../../apolloClient'
import theme from '../../../theme'
import ThemeProvider from '../../../ThemeProvider'

import MessageHistory from './index'
import { Environment, Network } from '../../../../services/EnvironmentProvider'

export default {
  title: 'MessageHistory/Table',
  component: MessageHistory,
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

const Template = args => (
  <MessageHistory cidHref={cid => `/#/detail/${cid}`} {...args} />
)

export const Base = Template.bind({})
Base.args = {
  warnMissingData: true,
  address: 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza'
}
