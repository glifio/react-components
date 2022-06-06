import { useState } from 'react'
import { SelectNumber } from './SelectNumber'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <SelectNumber
      value={value}
      onChange={setValue}
      autoFocus={true}
      {...props}
    />
  )
}

export default {
  title: 'InputV2/SelectNumber',
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
const label = 'Pick your favourite number'
const info = 'From our limited selection'
const options = [1, 7, 1337, 1999, 123456]

export const Base = Template.bind({})
Base.args = { label, options }

export const WithInfo = Template.bind({})
WithInfo.args = { label, options, info }

export const PreSelected = Template.bind({})
PreSelected.args = { label, options, value: 1999, info }

export const Disabled = Template.bind({})
Disabled.args = { label, options, info, disabled: true }

export const Placeholder = Template.bind({})
Placeholder.args = { label, options, placeholder: 'Make your pick' }

export const Vertical = Template.bind({})
Vertical.args = { label, options, vertical: true }

export const VerticalCentered = Template.bind({})
VerticalCentered.args = { label, options, vertical: true, centered: true }

export const VerticalWithInfo = Template.bind({})
VerticalWithInfo.args = { label, options, info, vertical: true }
