import { MessageHistoryTable } from '.'

export default {
  title: 'MessageHistory/Table',
  component: MessageHistoryTable
}

const Template = args => <MessageHistoryTable {...args} />

export const Base = Template.bind({})
Base.args = {
  warnMissingData: true,
  address: 't13koa6kz5otquokcgwusvtsxcdymuq7lqe4twb4i',
  cidHref: cid => `/#/detail/${cid}`
}
