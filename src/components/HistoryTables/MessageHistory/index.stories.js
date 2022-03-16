import { ApolloProvider } from '@apollo/client'
import { client } from '../apolloClient'
import theme from '../../theme'
import ThemeProvider from '../../ThemeProvider'

import MessageHistory from './index'

export default {
  title: 'MessageHistory/Table',
  component: MessageHistory,
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
  <MessageHistory cidHref={cid => `/#/detail/${cid}`} {...args} />
)

export const Base = Template.bind({})
Base.args = {
  address: 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza'
}
