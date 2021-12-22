import { ApolloProvider } from '@apollo/client'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

import MessageHistory from './index'
import { client } from './client'

export default {
  title: 'MessageHistory/Table',
  component: MessageHistory,
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

const Template = args => <MessageHistory {...args} />

export const Base = Template.bind({})
Base.args = {
  address: 'f0123'
}
