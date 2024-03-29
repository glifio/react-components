import { useState } from 'react'

import { ButtonV2 } from '../Button/V2'
import { WideDialog, ButtonRowRight, ShadowBox } from '../Layout'
import { AddressInput } from './Address'
import { Info } from './Info'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  const [delegated, setDelegated] = useState('')
  return (
    <WideDialog>
      <ShadowBox>
        <AddressInput
          value={value}
          onChange={setValue}
          setIsValid={setIsValid}
          setDelegated={setDelegated}
          autoFocus={true}
          {...props}
        />
        {delegated && (
          <Info
            label='FYI'
            value='The delegated address will be used for sending funds'
          />
        )}
      </ShadowBox>
      <ButtonRowRight>
        <ButtonV2 disabled={!isValid}>Send</ButtonV2>
      </ButtonRowRight>
    </WideDialog>
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

export const Eth = Template.bind({})
Eth.args = {
  label: 'Ethereum address',
  value: '0x8ba1f109551bd432803012645ac136ddd64dba72'
}

export const EthNotTruncated = Template.bind({})
EthNotTruncated.args = {
  label: 'Ethereum address',
  value: '0x8ba1f109551bd432803012645ac136ddd64dba72',
  truncate: false
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Receipient',
  disabled: true,
  value: 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza'
}
