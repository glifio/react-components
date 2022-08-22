import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { LabeledLink } from './LabeledLink'

export default {
  title: 'LabeledText/LabeledLink',
  component: LabeledLink,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
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
  color: 'var(--black)',
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
