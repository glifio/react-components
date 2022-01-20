import { ApolloProvider } from '@apollo/client'
import { client } from '../apolloClient'
import theme from '../../theme'
import ThemeProvider from '../../ThemeProvider'

import MessageDetail from './Detail'

export default {
  title: 'MessageHistory/MessageDetail',
  component: MessageDetail,
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
  <MessageDetail
    speedUp={() => {}}
    cancel={() => {}}
    addressHref={address => `/#/history/${address}`}
    {...args}
  />
)

export const Detail = Template.bind({})
Detail.args = {
  cid: 'bafy2bzacebf6orovs3hpx6teptxanwighhq7aui4b5vqwbgkq6vl5qc324cv4'
}
