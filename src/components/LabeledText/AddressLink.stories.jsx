import { AddressLink } from './AddressLink'
import { Colors } from '../theme'

export default {
  title: 'LabeledText/AddressLink',
  component: AddressLink,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <AddressLink {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Safe Address',
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy'
}

export const Black = Template.bind({})
Black.args = {
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy',
  color: Colors.BLACK
}

export const HideCopy = Template.bind({})
HideCopy.args = {
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy',
  hideCopy: true
}

export const NewTabIcon = Template.bind({})
NewTabIcon.args = {
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy',
  useNewTabIcon: true
}

export const AddressOnly = Template.bind({})
AddressOnly.args = {
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy'
}

export const IDOnly = Template.bind({})
IDOnly.args = {
  id: 't07633'
}

export const AddressAndID = Template.bind({})
AddressAndID.args = {
  id: 't07633',
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy'
}
