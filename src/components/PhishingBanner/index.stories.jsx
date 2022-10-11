import { PhishingBanner } from './index'

export default {
  title: 'PhishingBanner/PhishingBanner',
  component: PhishingBanner,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
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
