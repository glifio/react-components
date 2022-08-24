import { SearchBar } from '.'

export default {
  title: 'SearchBar/SearchBar',
  component: SearchBar,
  decorators: [
    Story => <div style={{ maxWidth: '35em', margin: '0 auto' }}>{Story()}</div>
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <SearchBar {...args} />

export const Base = Template.bind({})
Base.args = {
  placeholder: 'Enter a search term'
}

export const Large = Template.bind({})
Large.args = {
  large: true,
  placeholder: 'Enter a search term'
}
