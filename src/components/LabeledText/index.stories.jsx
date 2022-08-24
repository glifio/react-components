import { LabeledText } from '.'

export default {
  title: 'LabeledText/LabeledText',
  component: LabeledText,
  decorators: [
    Story => <div style={{ maxWidth: '35em', margin: '0 auto' }}>{Story()}</div>
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <LabeledText {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Balance',
  text: '100 FIL'
}
