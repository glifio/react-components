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
  <MessageHistory
    addressHref={address => `/#/history/${address}`}
    cidHref={cid => `/#/detail/${cid}`}
    {...args}
  />
)

export const Base = Template.bind({})
Base.args = {
  address: 't1b7l72vdnasf5yxoft5ihtujsnm6nvdpejsqj3ta'
}
