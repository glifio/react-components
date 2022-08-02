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

const Template = args => <Proposal {...args} />

export const Detail = Template.bind({})
Detail.args = {
  id: 8,
  msigAddress: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy',
  walletAddress: 't029519',
  approve: console.log,
  cancel: console.log
}
