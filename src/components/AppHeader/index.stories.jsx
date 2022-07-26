import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { AppHeader } from './index'
import { AppIconHeaderFooter, SafeIconHeaderFooter } from '../Icons'
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
  appIcon: <AppIconHeaderFooter iconStyle='dark' />,
  appUrl: 'https://glif.io',
  appHeaderLinks: [
    {
      title: 'Blog',
      url: 'https://glif.io/blog'
    },
    {
      title: 'Code',
      url: 'https://github.com/glifio'
    },
    {
      title: 'Nodes',
      url: 'https://lotus.filecoin.io/docs/developers/hosted-lotus'
    }
  ]
}

export const App = Template.bind({})
App.args = {
  logout: () => {},
  connection: (
    <NetworkConnection
      lotusApiAddr='https://calibration.node.glif.io'
      apiKey='m787669344-2a9b90eb03dbff3e503c93c7'
      statusApiAddr='https://api.uptimerobot.com/v2/getMonitors'
      errorCallback={() => {}}
    />
  ),
  appIcon: <SafeIconHeaderFooter />,
  appUrl: 'https://safe.glif.io',
  addressLinks: [
    {
      label: 'Safe Address',
      address: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy'
    },
    {
      label: 'Wallet Address',
      address: 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza'
    }
  ],
  labeledTexts: [
    {
      label: 'Balance',
      text: '100 FIL'
    }
  ],
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
