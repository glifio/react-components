import { Number } from './Number'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/Number',
  component: Number,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <Number {...args} />

const sharedArgs = {
  autofocus: true
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
