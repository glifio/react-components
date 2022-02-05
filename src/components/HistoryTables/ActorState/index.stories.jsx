import { ApolloProvider } from '@apollo/client'
import { client } from '../apolloClient'
import theme from '../../theme'
import ThemeProvider from '../../ThemeProvider'

import { ActorState } from '.'

export default {
  title: 'ActorState/ActorState',
  component: ActorState,
  decorators: [
    Story => (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </ApolloProvider>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <ActorState {...args} />

export const Base = Template.bind({})
Base.args = {
  address: 'f2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy'
}
