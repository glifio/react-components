import { TxLink } from './TxLink'
import { Colors } from '../theme'

export default {
  title: 'LabeledText/TxLink',
  component: TxLink,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <TxLink {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Filecoin Message',
  txID: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6'
}

export const Full = Template.bind({})
Full.args = {
  label: 'Filecoin Message',
  txID: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6',
  shouldTruncate: false
}

export const Hex = Template.bind({})
Hex.args = {
  label: 'Ethereum Tx',
  txID: '0x6870fd9ef4a4ee79174a2ac3fed33f33a6255eacca1903b47526dded0230507b'
}

export const HexFull = Template.bind({})
HexFull.args = {
  label: 'Ethereum Tx',
  txID: '0x6870fd9ef4a4ee79174a2ac3fed33f33a6255eacca1903b47526dded0230507b',
  shouldTruncate: false
}

export const Black = Template.bind({})
Black.args = {
  txID: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6',
  color: Colors.BLACK
}

export const HideCopy = Template.bind({})
HideCopy.args = {
  txID: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6',
  hideCopy: true
}

export const NewTabIcon = Template.bind({})
NewTabIcon.args = {
  txID: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6',
  useNewTabIcon: true
}
