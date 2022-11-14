import { MessageHistoryTable } from '.'

export default {
  title: 'MessageHistory/Table',
  component: MessageHistoryTable
}

const Template = args => <MessageHistoryTable {...args} />

export const Base = Template.bind({})
Base.args = {
  warnMissingData: true,
  address: 't410fvfpbkz7hhijg7rmmyb4dk75que4ellqm4ggc2hq',
  txIDHref: txID => `/#/detail/${txID}`
}
