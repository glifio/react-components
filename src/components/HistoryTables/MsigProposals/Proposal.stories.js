import { ApolloProvider } from '@apollo/client'
import { client } from '../apolloClient'
import theme from '../../theme'
import ThemeProvider from '../../ThemeProvider'

import Proposal from './Proposal'

export default {
  title: 'ProposalHistory/Proposal',
  component: Proposal,
  decorators: [
    Story => (
      <ApolloProvider client={client}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
        </div>
      </ApolloProvider>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <Proposal {...args} />

export const Detail = Template.bind({})
Detail.args = {
  cid: 'bafy2bzaceazsl4l2cimnmu3u7yiond4ffjav7lecfg5qedjj6loeqdpclk4hg',
  id: 0,
  address: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy',
  accept: console.log,
  reject: console.log
}
