import { ApolloProvider } from '@apollo/client'
import { client } from '../apolloClient'
import Proposal from './Proposal'
import { WALLET_ADDRESS, WALLET_ID } from '../../../test-utils/constants'

export default {
  title: 'ProposalHistory/Proposal',
  component: Proposal,
  decorators: [
    Story => <ApolloProvider client={client}>{Story()}</ApolloProvider>
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
