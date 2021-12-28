import { ApolloProvider } from '@apollo/client'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { client } from './client'

import MessageDetail from './Detail'

export default {
  title: 'MessageHistory/MessageDetail',
  component: MessageDetail,
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

const Template = args => <MessageDetail {...args} />

export const Detail = Template.bind({})
Detail.args = {
  cid: 'bafy2bzacebf6orovs3hpx6teptxanwighhq7aui4b5vqwbgkq6vl5qc324cv4'
}
