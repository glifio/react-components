import { useState } from 'react'
import { ButtonV2 } from '../ButtonV2'
import { ButtonRowRight, Dialog, ShadowBox, Lines } from '../Layout'
import { InputV2 } from '.'

const StoryComponent = () => {
  const [toAddress, setToAddress] = useState('')
  const [value, setValue] = useState(null)
  const [params, setParams] = useState('')
  const [isToAddressValid, setIsToAddressValid] = useState(false)
  const [isValueValid, setIsValueValid] = useState(false)
  const [isParamsValid, setIsParamsValid] = useState(false)
  const isValid = isToAddressValid && isValueValid && isParamsValid

  return (
    <Dialog>
      <form>
        <ShadowBox>
          <Lines>
            <InputV2.Address
              label='Recipient'
              autoFocus
              value={toAddress}
              onChange={setToAddress}
              setIsValid={setIsToAddressValid}
              truncate={false}
            />
            <InputV2.Filecoin
              label='Amount'
              value={value}
              denom='fil'
              onChange={setValue}
              setIsValid={setIsValueValid}
            />
            <InputV2.Params
              label='Params'
              value={params}
              onChange={setParams}
              setIsValid={setIsParamsValid}
            />
          </Lines>
        </ShadowBox>
      </form>
      <ButtonRowRight>
        <ButtonV2 disabled={!isValid}>Send</ButtonV2>
      </ButtonRowRight>
    </Dialog>
  )
}

export default {
  title: 'InputV2/InputV2',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />

export const Base = Template.bind({})
Base.args = {}
