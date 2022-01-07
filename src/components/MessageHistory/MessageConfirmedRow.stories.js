import { ApolloProvider } from '@apollo/client'
import { client } from './client'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

import MessageConfirmedRow from './MessageConfirmedRow'

export default {
  title: 'MessageHistory/MessageConfirmedRow',
  component: MessageConfirmedRow,
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

const Template = args => (
  <MessageConfirmedRow
    {...args}
    addressHref={address => `/#/history/${address}`}
    cidHref={cid => `/#/detail/${cid}`}
  />
)

export const GenericRow = Template.bind({})
GenericRow.args = {
  cid: 'bafy2bzacebf6orovs3hpx6teptxanwighhq7aui4b5vqwbgkq6vl5qc324cv4',
  inspectingAddress: 'f1b64l7up4oov74ignqfadshkge7h7aifwsaapjzd'
}
