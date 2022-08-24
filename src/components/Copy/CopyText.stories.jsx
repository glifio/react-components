import { CopyText } from './CopyText'

export default {
  title: 'Copy/CopyText',
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
