import { AccountError } from './Error'

export default {
  title: 'AccountCard/AccountError',
  component: AccountError,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <AccountError {...args} />

export const Base = Template.bind({})
Base.args = {
  errorMsg: 'There was an error'
}
