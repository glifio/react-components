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
  txID: '0xa90cfc87fe39b5046aaf6809a7b73e28c0a5136981f4f06b7f502bac16f98ca5'
}
