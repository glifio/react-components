import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { AppTilesWrapper } from './AppTilesWrapper'
import { AppTile } from './index'

export default {
  title: 'AppTile/AppTile',
  component: AppTile,
  decorators: [Story => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => (
  <AppTilesWrapper>
    <AppTile {...args} />{' '}
  </AppTilesWrapper>
)

export const Safe = Template.bind({})
Safe.args = {
  title: 'Safe',
  description: 'A Filecoin multisig wallet.',
  oldTileName: 'Vault',
  href: '/',
  imgSrc: '/static/bg-safe.jpg',
  imgSrcHover: '/static/bg-safe-hover.jpg',
  small: true,
  large: false
}

export const Wallet = Template.bind({})
Wallet.args = {
  title: 'Sender',
  description: 'A Filecoin wallet.',
  href: '/',
  imgSrc: '/static/bg-sender.jpg',
  imgSrcHover: '/static/bg-sender-hover.jpg',
  small: true
}

export const Beta = Template.bind({})
Beta.args = {
  title: 'Transaction History',
  description: 'A Filecoin transaction history.',
  href: '/',
  imgSrc: '/static/bg-wallet.png',
  beta: true,
  small: true
}

export const Soon = Template.bind({})
Soon.args = {
  title: 'Dex',
  description: 'A Filecoin dex.',
  href: '/',
  imgSrc: '/static/bg-wallet.png',
  soon: true,
  small: true
}

export const Large = Template.bind({})
Large.args = {
  title: 'Dex',
  description: 'A Filecoin dex.',
  href: '/',
  imgSrc: '/static/bg-wallet.png',
  large: true
}

const TemplateMul = args => (
  <AppTilesWrapper>
    <AppTile {...args} />
    <AppTile {...args} />
    <AppTile {...args} />
    <AppTile {...args} />
  </AppTilesWrapper>
)

export const Gallery = TemplateMul.bind({})
Gallery.args = {
  title: 'Sender',
  description: 'A Filecoin wallet.',
  href: '/',
  imgSrc: '/static/bg-sender.jpg',
  imgSrcHover: '/static/bg-sender-hover.jpg'
}
