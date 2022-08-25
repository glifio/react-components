import { SearchAddressMessage } from './SearchAddressMessage'

export default {
  title: 'SearchBar/SearchAddressMessage',
  component: SearchAddressMessage,
  decorators: [
    Story => <div style={{ maxWidth: '35em', margin: '0 auto' }}>{Story()}</div>
  ]
}

const Template = args => <SearchAddressMessage {...args} />

export const Base = Template.bind({})
Base.args = {}

export const Large = Template.bind({})
Large.args = { large: true }

export const Check = Template.bind({})
Check.args = { buttonText: 'Check' }
