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
  cid: 'bafy2bzaceaciyevjnfpyjdkkqgig45jnmwwra2g3zisshc6zpjxo6sso77ty6'
}
