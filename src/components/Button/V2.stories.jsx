import { ButtonV2 } from './V2'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { IconSpeedUp } from '../Icons'

export default {
  title: 'Button/ButtonV2',
  component: ButtonV2,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <ButtonV2 {...args}>Click me</ButtonV2>
const TemplateIcon = args => (
  <ButtonV2 {...args}>
    <IconSpeedUp width='1.25rem' />
    Click me
  </ButtonV2>
)

export const Base = Template.bind({})
Base.args = {}

export const Large = Template.bind({})
Large.args = {
  large: true
}

export const White = Template.bind({})
White.args = {
  white: true
}

export const Gray = Template.bind({})
Gray.args = {
  gray: true
}

export const Green = Template.bind({})
Green.args = {
  green: true
}

export const Red = Template.bind({})
Red.args = {
  red: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const IconBase = TemplateIcon.bind({})
IconBase.args = {}

export const IconLarge = TemplateIcon.bind({})
IconLarge.args = {
  large: true
}

export const IconWhite = TemplateIcon.bind({})
IconWhite.args = {
  white: true
}

export const IconGreen = TemplateIcon.bind({})
IconGreen.args = {
  green: true
}

export const IconRed = TemplateIcon.bind({})
IconRed.args = {
  red: true
}

export const IconDisabled = TemplateIcon.bind({})
IconDisabled.args = {
  disabled: true
}
