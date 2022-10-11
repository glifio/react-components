import { ErrorView } from '.'

export default {
  title: 'ErrorView/ErrorView',
  component: ErrorView,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <ErrorView {...args} />

export const Base = Template.bind({})
Base.args = {
  title: 'Ledger only supports Chrome',
  description:
    'Please install Google Chrome to continue using your Ledger device, or choose an alternative setup option',
  linkDisplay: 'Install Google Chrome.',
  linkhref: 'https://www.google.com/chrome'
}
