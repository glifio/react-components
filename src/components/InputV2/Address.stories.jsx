import { useState } from 'react'
import { ButtonV2 } from '../Button/V2'
import { Dialog, ButtonRowRight, ShadowBox } from '../Layout'
import { AddressInput } from './Address'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  return (
    <Dialog>
      <ShadowBox>
        <AddressInput
          value={value}
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
  title: 'InputV2/Address',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Receipient'
}

export const Safe = Template.bind({})
Safe.args = {
  label: 'Safe address',
  msig: true
}

export const NotTruncated = Template.bind({})
NotTruncated.args = {
  label: 'Receipient',
  value: 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza',
  truncate: false
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Receipient',
  disabled: true,
  value: 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza'
}
