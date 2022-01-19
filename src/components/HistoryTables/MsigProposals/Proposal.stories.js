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
  cid: 'bafy2bzacebf6orovs3hpx6teptxanwighhq7aui4b5vqwbgkq6vl5qc324cv4'
}
