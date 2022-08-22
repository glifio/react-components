import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { CidLink } from './CidLink'

export default {
  title: 'LabeledText/CidLink',
  component: CidLink,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <CidLink {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Message',
  cid: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6'
}

export const Black = Template.bind({})
Black.args = {
  cid: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6',
  color: 'var(--black)'
}

export const HideCopy = Template.bind({})
HideCopy.args = {
  cid: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6',
  hideCopy: true
}

export const NewTabIcon = Template.bind({})
NewTabIcon.args = {
  cid: 'bafy2bzacebgtugc5fzoyyit3cis4emhuapnbq43lttiubvh6ubn5mt7o7eja6',
  useNewTabIcon: true
}
