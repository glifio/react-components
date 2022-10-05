import { DisplayWord } from './DisplayWord'

export default {
  title: 'Connect/DisplayWord',
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
  num: 12,
  word: 'hello world'
}
