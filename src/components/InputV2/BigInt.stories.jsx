import { BigIntInput } from './BigInt'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/BigInt',
  component: BigIntInput,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => (
  <BigIntInput
    min={BigInt('9007199254740991')}
    max={BigInt('10007199254740991')}
    {...args}
  />
)

const sharedArgs = {
  autofocus: true,
  controlled: false
}

export const Base = Template.bind({})
Base.args = {
  ...sharedArgs,
  label: 'Enter your age',
  info: 'You must be between 9007199254740991 and 10007199254740991 years old'
}
