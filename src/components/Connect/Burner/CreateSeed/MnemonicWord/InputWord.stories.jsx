import { InputWord } from './InputWord'

export default {
  title: 'Connect/InputWord',
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
  word: 'hello',
  onValidChange: valid => console.log(valid)
}
