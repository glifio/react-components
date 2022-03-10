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

export const Base = Template.bind({})
Base.args = {
  label: 'Safe Address',
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy'
}
