import { LabeledLink } from './LabeledLink'
import { Colors } from '../theme'

export default {
  title: 'LabeledText/LabeledLink',
  component: LabeledLink,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <LabeledLink {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Glif Safe',
  href: 'https://safe.glif.link/',
  linkText: 'safe.glif.link',
  copyText: 'https://safe.glif.link/'
}

export const Black = Template.bind({})
Black.args = {
  label: 'Glif Safe',
  color: Colors.BLACK,
  href: 'https://safe.glif.link/',
  linkText: 'safe.glif.link',
  copyText: 'https://safe.glif.link/'
}

export const HideCopy = Template.bind({})
HideCopy.args = {
  label: 'Glif Safe',
  href: 'https://safe.glif.link/',
  linkText: 'safe.glif.link',
  copyText: 'https://safe.glif.link/',
  hideCopy: true
}

export const NewTabIcon = Template.bind({})
NewTabIcon.args = {
  label: 'Glif Safe',
  href: 'https://safe.glif.link/',
  linkText: 'safe.glif.link',
  copyText: 'https://safe.glif.link/',
  useNewTabIcon: true
}
