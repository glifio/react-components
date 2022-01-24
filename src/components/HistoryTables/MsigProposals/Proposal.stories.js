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
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </ApolloProvider>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => (
  <Proposal speedUp={() => {}} cancel={() => {}} {...args} />
)

export const Detail = Template.bind({})
Detail.args = {
  cid: 'bafy2bzaceazsl4l2cimnmu3u7yiond4ffjav7lecfg5qedjj6loeqdpclk4hg',
  walletAddress: 't029519',
  id: 0,
  address: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy',
  accept: console.log,
  reject: console.log,
  cidHref: () => '',
  addressHref: () => ''
}
