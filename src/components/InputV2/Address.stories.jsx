import { useState } from 'react'
import { ButtonV2 } from '../Button/V2'
import { ButtonRowRight } from '../Layout/Buttons'
import { AddressInput } from './Address'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  return (
    <div>
      <AddressInput
        value={value}
        onChange={setValue}
        setIsValid={setIsValid}
        autofocus
        {...props}
      />
      <ButtonRowRight>
        <ButtonV2 disabled={!isValid}>Send</ButtonV2>
      </ButtonRowRight>
    </div>
  )
}

export default {
  title: 'InputV2/Address',
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
  label: "Enter the recipient's address"
}

export const Safe = Template.bind({})
Safe.args = {
  label: 'Enter your safe address',
  msig: true
}

export const NotTruncated = Template.bind({})
NotTruncated.args = {
  label: "Enter the recipient's address",
  value: 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza',
  truncate: false
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'This address cannot be changed',
  disabled: true,
  value: 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza'
}
