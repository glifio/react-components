import DisplayWord from './DisplayWord'

export default {
  title: 'MnemonicWord/DisplayWord',
  component: DisplayWord,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <DisplayWord {...args} />

export const Base = Template.bind({})
Base.args = {
  word: 'hello world',
  num: 12,
  valid: true
}
