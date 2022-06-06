import { useState } from 'react'
import { Select } from './Select'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <Select value={value} onChange={setValue} autoFocus={true} {...props} />
  )
}

export default {
  title: 'InputV2/Select',
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
const label = 'Pick your favourite animal'
const info = 'To visit at the farm'
const options = ['Dog', 'Cat', 'Hamster', 'Horse', 'Snake']

export const Base = Template.bind({})
Base.args = { label, options }

export const WithInfo = Template.bind({})
WithInfo.args = { label, options, info }

export const PreSelected = Template.bind({})
PreSelected.args = { label, options, value: 'Horse', info }

export const Disabled = Template.bind({})
Disabled.args = { label, options, info, disabled: true }

export const Address = Template.bind({})
Address.args = {
  label: 'Select an address',
  options: [
    't16xlkjp3dcfrsb257duoqfgj7glo2uvvgxyy4gmy',
    't1dywbadna5yyf546mloeoc7gxrzj7n5uog6llv5y',
    't16sfr4wmxu7ouxayxqqmacmgdfqfbasm4qr472fq',
    't1fbagfbmhk52hhbih2yt2jixkbisoqtrg4k2kn7a',
    't1ov46djkc4iojaxmg5t4tjayfm6ngjfwunpkkj5i'
  ],
  address: true
}

export const Placeholder = Template.bind({})
Placeholder.args = { label, options, placeholder: 'Make your pick' }

export const Vertical = Template.bind({})
Vertical.args = { label, options, vertical: true }

export const VerticalCentered = Template.bind({})
VerticalCentered.args = { label, options, vertical: true, centered: true }

export const VerticalWithInfo = Template.bind({})
VerticalWithInfo.args = { label, options, info, vertical: true }
