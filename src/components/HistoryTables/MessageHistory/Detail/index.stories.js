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
  txID: 'bafy2bzacebt5tgzzvjgnlciu5zilc2w2ybsjhxkln6k4lg5ijrjs2x37bdtos'
}
