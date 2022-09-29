import { Tooltip } from '.'

export default {
  title: 'Tooltip/Tooltip',
  component: Tooltip,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <Tooltip {...args} />

export const Base = Template.bind({})
Base.args = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec est ultrices, posuere lorem a, convallis quam. Etiam venenatis velit.'
}
