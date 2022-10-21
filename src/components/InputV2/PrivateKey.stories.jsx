import { useState } from 'react'
import { ButtonV2 } from '../Button/V2'
import { Dialog, ButtonRowRight, ShadowBox } from '../Layout'
import { PrivateKeyInput } from './PrivateKey'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  return (
    <Dialog>
      <ShadowBox>
        <PrivateKeyInput
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
  title: 'InputV2/PrivateKey',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />

export const Base64 = Template.bind({})
Base64.args = {
  label: 'Enter a base64 private key',
  isHex: false
}

export const Hex = Template.bind({})
Hex.args = {
  label: 'Enter a hex private key',
  isHex: true
}
