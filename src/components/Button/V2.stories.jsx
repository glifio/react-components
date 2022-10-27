import { ButtonV2, ButtonV2Link } from './V2'
import { IconSpeedUp } from '../Icons'

export default {
  title: 'Button/ButtonV2',
  component: ButtonV2,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <ButtonV2 {...args}>Click me</ButtonV2>
const TemplateIcon = args => (
  <ButtonV2 {...args}>
    <IconSpeedUp height={args.large ? '1.25rem' : '1rem'} />
    Click me
  </ButtonV2>
)
const TemplateLink = args => <ButtonV2Link {...args}>Click me</ButtonV2Link>

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

export const LinkBase = TemplateLink.bind({})
LinkBase.args = {
  href: 'https://glif.io'
}

export const LinkLarge = TemplateLink.bind({})
LinkLarge.args = {
  href: 'https://glif.io',
  large: true
}

export const LinkWhite = TemplateLink.bind({})
LinkWhite.args = {
  href: 'https://glif.io',
  white: true
}

export const LinkGreen = TemplateLink.bind({})
LinkGreen.args = {
  href: 'https://glif.io',
  green: true
}

export const LinkRed = TemplateLink.bind({})
LinkRed.args = {
  href: 'https://glif.io',
  red: true
}

export const LinkDisabled = TemplateLink.bind({})
LinkDisabled.args = {
  href: 'https://glif.io',
  disabled: true
}
