import { useState } from 'react'
import { ButtonV2 } from '../Button/V2'
import { Dialog, ButtonRowRight, ShadowBox } from '../Layout'
import { FilecoinNumber } from '@glif/filecoin-number'
import { FilecoinInput } from './Filecoin'

const StoryComponent = ({ min, max, value: val, denom, ...props }) => {
  const hasMin = !!min || typeof min === 'number'
  const hasMax = !!max || typeof max === 'number'
  const defaultValue =
    !!val || typeof val === 'number'
      ? new FilecoinNumber(val, denom || 'fil')
      : null
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  return (
    <Dialog>
      <ShadowBox>
        <FilecoinInput
          min={hasMin ? new FilecoinNumber(min, denom || 'fil') : null}
          max={hasMax ? new FilecoinNumber(max, denom || 'fil') : null}
          value={value}
          denom={denom}
          onChange={setValue}
          setIsValid={setIsValid}
          autoFocus={true}
          {...props}
        />
      </ShadowBox>
      <ButtonRowRight>
        <ButtonV2 disabled={!isValid}>Send</ButtonV2>
      </ButtonRowRight>
    </Dialog>
  )
}

export default {
  title: 'InputV2/Filecoin',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Enter any amount in FIL'
}

export const PreFilled = Template.bind({})
PreFilled.args = {
  label: 'Adjust the amount in FIL',
  value: 50.5
}

export const Positive = Template.bind({})
Positive.args = {
  label: 'Enter a positive amount',
  min: 0
}

export const Negative = Template.bind({})
Negative.args = {
  label: 'Enter a negative amount',
  max: 0
}

export const MinMax = Template.bind({})
MinMax.args = {
  label: 'Enter an amount in FIL',
  info: 'Must be between 0 and 100 FIL',
  min: 0,
  max: 100
}

export const AttoFIL = Template.bind({})
AttoFIL.args = {
  label: 'Enter an amount in attoFIL',
  info: 'Must be between -500 and 500',
  denom: 'attofil',
  min: -500,
  max: 500
}

export const PicoFIL = Template.bind({})
PicoFIL.args = {
  label: 'Enter an amount in picoFIL',
  info: 'Must be between -500 and 500',
  denom: 'picofil',
  min: -1000,
  max: 1000
}
