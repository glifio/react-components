import { ApolloProvider } from '@apollo/client'
import { client } from '../../apolloClient'

import MessageHistory from './index'

export default {
  title: 'MessageHistory/Table',
  component: MessageHistory,
  decorators: [
    Story => <ApolloProvider client={client}>{Story()}</ApolloProvider>
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => (
  <MessageHistory cidHref={cid => `/#/detail/${cid}`} {...args} />
)

export const Base = Template.bind({})
Base.args = {
  warnMissingData: true,
  address: 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza'
}
