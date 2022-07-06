import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import PhishingBanner from './index'

export default {
  title: 'PhishingBanner/PhishingBanner',
  component: PhishingBanner,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <PhishingBanner {...args} />

export const Base = Template.bind({})
Base.args = {
  href: 'https://test.glif.io'
}

export const Phished = Template.bind({})
Phished.args = {
  href: 'https://test.glif.io.hacked'
}
