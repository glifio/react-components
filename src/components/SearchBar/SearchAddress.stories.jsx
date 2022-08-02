import { SearchAddress } from './SearchAddress'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'SearchBar/SearchAddress',
  component: SearchAddress,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <SearchAddress {...args} />

export const Base = Template.bind({})
Base.args = {}

export const Large = Template.bind({})
Large.args = { large: true }

export const Check = Template.bind({})
Check.args = { buttonText: 'Check' }