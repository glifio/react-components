import { SearchBar } from '.'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'SearchBar/SearchBar',
  component: SearchBar,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <SearchBar {...args} />

export const Base = Template.bind({})
Base.args = {
  placeholder: 'Enter an address or message CID'
}

export const Large = Template.bind({})
Large.args = {
  large: true,
  placeholder: 'Enter an address or message CID'
}
