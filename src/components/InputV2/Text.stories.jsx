import { TextInput } from './Text'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/Text',
  component: TextInput,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <TextInput {...args} />

const sharedArgs = {
  autofocus: true,
  controlled: false
}

export const Base = Template.bind({})
Base.args = {
  ...sharedArgs,
  label: 'Enter your name'
}

export const NoLabel = Template.bind({})
NoLabel.args = {
  ...sharedArgs
}

export const WithInfo = Template.bind({})
WithInfo.args = {
  ...sharedArgs,
  label: 'Enter your name',
  info: 'Or your nickname'
}

export const Error = Template.bind({})
Error.args = {
  ...sharedArgs,
  label: 'Enter something else',
  error: 'Oh no! Something went wrong :(',
  value: 'This is wrong'
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...sharedArgs,
  label: 'You cannot enter anything',
  disabled: true,
  value: 'Too bad'
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  ...sharedArgs,
  label: 'Enter your name',
  placeholder: 'here please'
}

export const PlaceholderDisabled = Template.bind({})
PlaceholderDisabled.args = {
  ...sharedArgs,
  label: 'You cannot enter anything',
  disabled: true,
  placeholder: 'over here'
}

export const Vertical = Template.bind({})
Vertical.args = {
  ...sharedArgs,
  vertical: true,
  label: 'Enter your name'
}

export const VerticalCentered = Template.bind({})
VerticalCentered.args = {
  ...sharedArgs,
  vertical: true,
  centered: true,
  label: 'Enter your name'
}

export const VerticalWithInfo = Template.bind({})
VerticalWithInfo.args = {
  ...sharedArgs,
  vertical: true,
  label: 'Enter your name',
  info: 'Or your nickname'
}

export const VerticalError = Template.bind({})
VerticalError.args = {
  ...sharedArgs,
  vertical: true,
  label: 'Enter something else',
  error: 'Oh no! Something went wrong :(',
  value: 'This is wrong'
}

export const VerticalNoLabel = Template.bind({})
VerticalNoLabel.args = {
  ...sharedArgs,
  vertical: true
}
