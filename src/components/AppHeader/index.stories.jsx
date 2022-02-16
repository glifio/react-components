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
  homeUrl: 'https://glif.io',
  blogUrl: 'https://glif.io/blog',
  codeUrl: 'https://glif.io/code',
  nodesUrl: 'https://glif.io/nodes',
  safeUrl: 'https://safe.glif.io',
  walletUrl: 'https://wallet.glif.io',
  verifierUrl: 'https://verifier.glif.io',
  explorerUrl: 'https://explorer.glif.io'
}
