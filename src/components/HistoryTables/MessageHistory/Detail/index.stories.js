import { ApolloProvider } from '@apollo/client'
import { client } from '../../apolloClient'
import theme from '../../../theme'
import ThemeProvider from '../../../ThemeProvider'

import MessageDetail from '.'
import { Environment } from '../../../../services/EnvironmentProvider'

export default {
  title: 'MessageHistory/MessageDetail',
  component: MessageDetail,
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
  <MessageDetail
    speedUp={() => {}}
    cancel={() => {}}
    confirmations={50}
    {...args}
  />
)

export const Detail = Template.bind({})
Detail.args = {
  cid: 'bafy2bzaced3ub5g4v35tj7n74zsog3dmcum4tk4qmchbhjx7q747jghal3l4g'
}
