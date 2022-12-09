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
  txID: 'bafy2bzacedoibf7cwfqql7byp4c73iogyeurq7bstbr3lhp4j7bvcn422pusw'
}
