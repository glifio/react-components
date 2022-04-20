import { FilecoinNumber } from '@glif/filecoin-number'
import { FilecoinInput } from './Filecoin'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/Filecoin',
  component: FilecoinInput,
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
  <FilecoinInput
    min={new FilecoinNumber('0', 'fil')}
    max={new FilecoinNumber('100', 'fil')}
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
  label: 'Enter an amount in FIL',
  info: 'Must be between 0 and 100 FIL'
}

export const AttoFIL = Template.bind({})
AttoFIL.args = {
  ...sharedArgs,
  label: 'Enter an amount in attoFIL',
  info: 'Must be between 0 and 100 FIL',
  denom: 'attofil'
}

export const PicoFIL = Template.bind({})
PicoFIL.args = {
  ...sharedArgs,
  label: 'Enter an amount in picoFIL',
  info: 'Must be between 0 and 100 FIL',
  denom: 'picofil'
}