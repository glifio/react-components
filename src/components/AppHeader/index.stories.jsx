import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import AppHeader from './index'

export default {
  title: 'AppHeader/AppHeader',
  component: AppHeader,
  decorators: [Story => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <AppHeader {...args} />

export const Base = Template.bind({})
Base.args = {
  homeHref: 'https://glif.io',
  blogHref: 'https://glif.io/blog',
  codeHref: 'https://glif.io/code',
  nodesHref: 'https://glif.io/nodes'
}
