import { useState } from 'react'
import { ButtonV2 } from '../Button/V2'
import { ButtonRowRight } from '../Layout/Buttons'
import { FilecoinNumber } from '@glif/filecoin-number'
import { FilecoinInput } from './Filecoin'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ min, max, value: defaultValue, denom, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  const hasMin = !!min || typeof min === 'number'
  const hasMax = !!max || typeof max === 'number'
  return (
    <div>
      <FilecoinInput
        min={hasMin ? new FilecoinNumber(min, denom || 'fil') : null}
        max={hasMax ? new FilecoinNumber(max, denom || 'fil') : null}
        value={value}
        denom={denom}
        onChange={setValue}
        setIsValid={setIsValid}
        autofocus={true}
        {...props}
      />
      <ButtonRowRight>
        <ButtonV2 disabled={!isValid}>Send</ButtonV2>
      </ButtonRowRight>
    </div>
  )
}

export default {
  title: 'InputV2/Filecoin',
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
  label: 'Enter an amount in FIL',
  info: 'Must be between 0 and 100 FIL'
}

export const AttoFIL = Template.bind({})
AttoFIL.args = {
  label: 'Enter an amount in attoFIL',
  info: 'Must be between 0 and 100 FIL',
  denom: 'attofil'
}

export const PicoFIL = Template.bind({})
PicoFIL.args = {
  label: 'Enter an amount in picoFIL',
  info: 'Must be between 0 and 100 FIL',
  denom: 'picofil'
}
