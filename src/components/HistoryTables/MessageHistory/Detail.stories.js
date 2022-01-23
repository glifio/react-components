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
    confirmations={50}
    {...args}
  />
)

export const Detail = Template.bind({})
Detail.args = {
  cid: 'bafy2bzaceag4ao5mzcmbiusl55wz452cntyx6kv5vsndm4xtbt5g7phibgyn6'
}
