import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { AddressLink } from './index'

export default {
  title: 'AddressLink/AddressLink',
  component: AddressLink,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <AddressLink {...args} />

export const Labelled = Template.bind({})
Labelled.args = {
  label: 'Safe Address',
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy'
}

export const Black = Template.bind({})
Black.args = {
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy',
  color: 'var(--black)'
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
