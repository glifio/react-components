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
  txID: 'bafy2bzacea423tbrsrtpub5v3uzst4ya2wtgn4dolyye6xhyhzdvbwqpchyww'
}
