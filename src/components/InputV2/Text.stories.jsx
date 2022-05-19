import { useState } from 'react'
import { TextInput } from './Text'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <TextInput value={value} onChange={setValue} autofocus={true} {...props} />
  )
}

export default {
  title: 'InputV2/Text',
  component: StoryComponent,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <StoryComponent {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Enter your name'
}

export const NoLabel = Template.bind({})

export const AutoComplete = Template.bind({})
AutoComplete.args = {
  label: 'Enter your name',
  name: 'name'
}

export const Required = Template.bind({})
Required.args = {
  label: 'Enter your name',
  required: true
}

export const WithInfo = Template.bind({})
WithInfo.args = {
  label: 'Enter your name',
  info: 'Or your nickname'
}

export const Deletable = Template.bind({})
Deletable.args = {
  deletable: true,
  label: 'Enter your name'
}

export const Error = Template.bind({})
Error.args = {
  label: 'Enter something else',
  error: 'Oh no! Something went wrong :(',
  value: 'This is wrong'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'You cannot enter anything',
  disabled: true,
  value: 'Too bad'
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  label: 'Enter your name',
  placeholder: 'here please'
}

export const PlaceholderDisabled = Template.bind({})
PlaceholderDisabled.args = {
  label: 'You cannot enter anything',
  disabled: true,
  placeholder: 'over here'
}

export const Vertical = Template.bind({})
Vertical.args = {
  vertical: true,
  label: 'Enter your name'
}

export const VerticalCentered = Template.bind({})
VerticalCentered.args = {
  vertical: true,
  centered: true,
  label: 'Enter your name'
}

export const VerticalWithInfo = Template.bind({})
VerticalWithInfo.args = {
  vertical: true,
  label: 'Enter your name',
  info: 'Or your nickname'
}

export const VerticalDeletable = Template.bind({})
VerticalDeletable.args = {
  deletable: true,
  vertical: true,
  label: 'Enter your name'
}

export const VerticalError = Template.bind({})
VerticalError.args = {
  vertical: true,
  label: 'Enter something else',
  error: 'Oh no! Something went wrong :(',
  value: 'This is wrong'
}

export const VerticalNoLabel = Template.bind({})
VerticalNoLabel.args = {
  vertical: true
}
