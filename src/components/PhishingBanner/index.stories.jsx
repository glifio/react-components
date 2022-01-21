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
  href: 'https://sender.glif.io',
  closed: false,
  setClosed: () => {}
}
