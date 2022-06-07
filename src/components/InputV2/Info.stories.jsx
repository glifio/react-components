import { Info } from './Info'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/Info',
  component: Info,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const label = 'The answer is'
const info = 'Without a doubt'
const value = 'Fourty two'
const Template = args => <Info {...args} />

export const Base = Template.bind({})
Base.args = {
  label,
  value
}

export const NoLabel = Template.bind({})
NoLabel.args = {
  value
}

export const WithInfo = Template.bind({})
WithInfo.args = {
  label,
  info,
  value
}

export const Number = Template.bind({})
Number.args = {
  label,
  value: 42
}

export const Address = Template.bind({})
Address.args = {
  label: 'The address is',
  address: true,
  value: 't1iuryu3ke2hewrcxp4ezhmr5cmfeq3wjhpxaucza'
}

export const Vertical = Template.bind({})
Vertical.args = {
  vertical: true,
  label,
  value
}

export const VerticalCentered = Template.bind({})
VerticalCentered.args = {
  vertical: true,
  centered: true,
  label,
  value
}

export const VerticalWithInfo = Template.bind({})
VerticalWithInfo.args = {
  vertical: true,
  label,
  info,
  value
}

export const VerticalNoLabel = Template.bind({})
VerticalNoLabel.args = {
  vertical: true,
  value
}
