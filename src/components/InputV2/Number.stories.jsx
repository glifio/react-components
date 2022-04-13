import { NumberInput } from './Number'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/Number',
  component: NumberInput,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <NumberInput {...args} />

const sharedArgs = {
  autofocus: true,
  controlled: false
}

export const Base = Template.bind({})
Base.args = {
  ...sharedArgs,
  label: 'Enter your age'
}

export const PreFilled = Template.bind({})
PreFilled.args = {
  ...sharedArgs,
  label: 'Enter your age',
  value: 35
}

export const MinValue = Template.bind({})
MinValue.args = {
  ...sharedArgs,
  label: 'Enter your age',
  info: 'You must be 21 or older',
  min: 21
}

export const MinMaxValue = Template.bind({})
MinMaxValue.args = {
  ...sharedArgs,
  label: 'Enter your age',
  info: 'You must be between 25 and 35 years old',
  min: 25,
  max: 35
}

export const Vertical = Template.bind({})
Vertical.args = {
  ...sharedArgs,
  vertical: true,
  label: 'Enter your age'
}

export const VerticalMinValue = Template.bind({})
VerticalMinValue.args = {
  ...sharedArgs,
  vertical: true,
  label: 'Enter your age',
  info: 'You must be 21 or older',
  min: 21
}
