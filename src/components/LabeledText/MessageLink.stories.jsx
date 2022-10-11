import { MessageLink } from './MessageLink'
import { Colors } from '../theme'

export default {
  title: 'LabeledText/MessageLink',
  component: MessageLink,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <MessageLink {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Message',
  cid: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6'
}

export const Black = Template.bind({})
Black.args = {
  cid: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6',
  color: Colors.BLACK
}

export const HideCopy = Template.bind({})
HideCopy.args = {
  cid: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6',
  hideCopy: true
}

export const NewTabIcon = Template.bind({})
NewTabIcon.args = {
  cid: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6',
  useNewTabIcon: true
}
