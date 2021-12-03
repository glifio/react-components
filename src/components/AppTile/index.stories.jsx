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

export const Base = Template.bind({})
Base.args = {
  title: 'Safe',
  description: 'A Filecoin multisig wallet.',
  oldTileName: 'Vault',
  href: '/',
  imgSrc: '/static/bg-safe.png'
}
