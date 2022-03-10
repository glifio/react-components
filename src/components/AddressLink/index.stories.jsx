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

export const AddressOnly = Template.bind({})
AddressOnly.args = {
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy'
}

export const IDOnly = Template.bind({})
IDOnly.args = {
  id: 't032430'
}

export const AddressAndID = Template.bind({})
AddressAndID.args = {
  id: 't032430',
  address: 't1dywbadna5yyf546mloeoc7gxrzj7n5uog6llv5y'
}
