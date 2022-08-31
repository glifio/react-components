import MessageDetail from '.'

export default {
  title: 'MessageHistory/MessageDetail',
  component: MessageDetail
}

const Template = args => (
  <MessageDetail
    speedUp={() => {}}
    cancel={() => {}}
    confirmations={50}
    {...args}
  />
)

export const Detail = Template.bind({})
Detail.args = {
  cid: 'bafy2bzaced3ub5g4v35tj7n74zsog3dmcum4tk4qmchbhjx7q747jghal3l4g'
}
