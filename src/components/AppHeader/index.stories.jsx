import styled from 'styled-components'
import { AppHeader } from './index'
import { AppIconHeaderFooter, SafeIconHeaderFooter } from '../Icons'
import { SearchAddressMessage } from '../SearchBar/SearchAddressMessage'
import { NetworkSelector } from '../NetworkSelector'

export default {
  title: 'AppHeader/AppHeader',
  component: AppHeader
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
  connection: <NetworkSelector errorCallback={() => {}} />,
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

const SearchBarWrapper = styled.div`
  flex-basis: 40em;
`

export const Search = Template.bind({})
Search.args = {
  appIcon: <AppIconHeaderFooter iconStyle='dark' />,
  appUrl: 'https://glif.io',
  customHeaderComps: (
    <SearchBarWrapper>
      <SearchAddressMessage hideErrorMessage />
    </SearchBarWrapper>
  ),
  appHeaderLinks: [
    {
      title: 'Wallet',
      url: 'https://wallet-calibration.glif.link'
    },
    {
      title: 'Safe',
      url: 'https://safe-calibration.glif.link'
    },
    {
      title: 'Blog',
      url: 'https://blog.glif.io/'
    },
    {
      title: 'Discord',
      url: 'https://discord.gg/B9ju5Eu4Rq'
    }
  ]
}
