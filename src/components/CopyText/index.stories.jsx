import { CopyText } from '.'
import { Colors } from '../theme'

export default {
  title: 'CopyText/CopyText',
  component: CopyText,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <CopyText {...args} />

export const Base = Template.bind({})
Base.args = {
  text: 'value'
}

export const Green = Template.bind({})
Green.args = {
  text: 'value',
  color: Colors.GREEN_MEDIUM
}

export const HideCopyText = Template.bind({})
HideCopyText.args = {
  text: 'value',
  hideCopyText: true
}
