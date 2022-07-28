import { SearchAddressMessage } from './SearchAddressMessage'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'SearchBar/SearchAddressMessage',
  component: SearchAddressMessage,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <SearchAddressMessage {...args} />

export const Base = Template.bind({})
Base.args = {}

export const Large = Template.bind({})
Large.args = { large: true }
