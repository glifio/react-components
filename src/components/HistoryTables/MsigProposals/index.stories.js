import { ApolloProvider } from '@apollo/client'
import { client } from '../apolloClient'
import theme from '../../theme'
import ThemeProvider from '../../ThemeProvider'

import ProposalHistory from './index'

export default {
  title: 'ProposalHistory/Table',
  component: ProposalHistory,
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
  <ProposalHistory
    cidHref={cid => `/#/detail/${cid}`}
    {...args}
  />
)

export const Base = Template.bind({})
Base.args = {
  address: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy',
  walletAddr: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy'
}
