import { useState } from 'react'
import { ButtonV2 } from '../Button/V2'
import { ButtonRowRight } from '../Layout/Buttons'
import { PrivateKeyInput } from './PrivateKey'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  return (
    <div>
      <PrivateKeyInput
        value={value}
        onChange={setValue}
        setIsValid={setIsValid}
        autoFocus={true}
        {...props}
      />
      <ButtonRowRight>
        <ButtonV2 disabled={!isValid}>Send</ButtonV2>
      </ButtonRowRight>
    </div>
  )
}

export default {
  title: 'InputV2/PrivateKey',
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
  label: 'Enter a private key'
}
