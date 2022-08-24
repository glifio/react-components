import InputWord from './InputWord'

export default {
  title: 'MnemonicWord/InputWord',
  component: InputWord,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <InputWord {...args} />

export const Base = Template.bind({})
Base.args = {
  num: 12,
  wordToMatch: 'hello world',
  importSeedError: false,
  correctWordCount: 2
}
