import { useState } from 'react'
import { TextInput, PasswordInput } from './Text'
import { Dialog, ShadowBox } from '../Layout'

const StoryComponent = ({ value: defaultValue, Comp, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <Dialog>
      <ShadowBox>
        <Comp value={value} onChange={setValue} autoFocus={true} {...props} />
      </ShadowBox>
    </Dialog>
  )
}

export default {
  title: 'InputV2/Text',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />

export const Text = Template.bind({})
Text.args = {
  Comp: TextInput,
  label: 'Enter your name'
}

export const Suffix = Template.bind({})
Suffix.args = {
  Comp: TextInput,
  label: 'Enter your name',
  suffix: 'This will show below the input field'
}

export const Password = Template.bind({})
Password.args = {
  Comp: PasswordInput,
  label: 'Enter your password'
}

export const NoLabel = Template.bind({})
NoLabel.args = {
  Comp: TextInput
}

export const AutoComplete = Template.bind({})
AutoComplete.args = {
  Comp: TextInput,
  label: 'Enter your name',
  name: 'name'
}

export const Required = Template.bind({})
Required.args = {
  Comp: TextInput,
  label: 'Enter your name',
  required: true
}

export const WithInfo = Template.bind({})
WithInfo.args = {
  Comp: TextInput,
  label: 'Enter your name',
  info: 'Or your nickname'
}

export const Deletable = Template.bind({})
Deletable.args = {
  Comp: TextInput,
  deletable: true,
  label: 'Enter your name'
}

export const Error = Template.bind({})
Error.args = {
  Comp: TextInput,
  label: 'Enter something else',
  error: 'Oh no! Something went wrong :(',
  value: 'This is wrong'
}

export const Disabled = Template.bind({})
Disabled.args = {
  Comp: TextInput,
  label: 'You cannot enter anything',
  disabled: true,
  value: 'Too bad'
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  Comp: TextInput,
  label: 'Enter your name',
  placeholder: 'here please'
}

export const PlaceholderDisabled = Template.bind({})
PlaceholderDisabled.args = {
  Comp: TextInput,
  label: 'You cannot enter anything',
  disabled: true,
  placeholder: 'over here'
}

export const Vertical = Template.bind({})
Vertical.args = {
  Comp: TextInput,
  vertical: true,
  label: 'Enter your name'
}

export const VerticalCentered = Template.bind({})
VerticalCentered.args = {
  Comp: TextInput,
  vertical: true,
  centered: true,
  label: 'Enter your name'
}

export const VerticalWithInfo = Template.bind({})
VerticalWithInfo.args = {
  Comp: TextInput,
  vertical: true,
  label: 'Enter your name',
  info: 'Or your nickname'
}

export const VerticalDeletable = Template.bind({})
VerticalDeletable.args = {
  Comp: TextInput,
  deletable: true,
  vertical: true,
  label: 'Enter your name'
}

export const VerticalError = Template.bind({})
VerticalError.args = {
  Comp: TextInput,
  vertical: true,
  label: 'Enter something else',
  error: 'Oh no! Something went wrong :(',
  value: 'This is wrong'
}

export const VerticalNoLabel = Template.bind({})
VerticalNoLabel.args = {
  Comp: TextInput,
  vertical: true
}
