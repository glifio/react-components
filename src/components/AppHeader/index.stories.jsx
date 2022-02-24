import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import AppHeader from './index'
import { SafeIconHeaderFooter } from '../Icons'
import { NetworkConnection } from '../NetworkConnection'

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

export const App = Template.bind({})
App.args = {
  back: () => {},
  logout: () => {},
  connection: (
    <NetworkConnection
      lotusApiAddr='https://calibration.node.glif.io'
      apiKey='m787669344-2a9b90eb03dbff3e503c93c7'
      statusApiAddr='https://api.uptimerobot.com/v2/getMonitors'
      errorCallback={() => {}}
    />
  ),
  appTitle: 'Safe',
  appIcon: <SafeIconHeaderFooter />,
  appUrl: 'https://safe.glif.io',
  blogUrl: 'https://glif.io/blog',
  walletUrl: 'https://wallet.glif.io',
  explorerUrl: 'https://explorer.glif.io',
  appHeaderLinks: [
    {
      title: 'Assets',
      url: 'https://safe.glif.io/home'
    },
    {
      title: 'History',
      url: 'https://safe.glif.io/history'
    },
    {
      title: 'Proposals',
      url: 'https://safe.glif.io/proposals'
    },
    {
      title: 'Admin',
      url: 'https://safe.glif.io/admin'
    }
  ]
}
