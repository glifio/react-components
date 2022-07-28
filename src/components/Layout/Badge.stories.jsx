import { Badge } from './Badge'

export default {
  title: 'Layout/Badge',
  component: Badge
}

const Template = args => <Badge {...args} />

export const Purple = Template.bind({})
Purple.args = {
  text: 'purple',
  color: 'purple'
}

export const Green = Template.bind({})
Green.args = {
  text: 'green',
  color: 'green'
}

export const Yellow = Template.bind({})
Yellow.args = {
  text: 'yellow',
  color: 'yellow'
}

export const Red = Template.bind({})
Red.args = {
  text: 'red',
  color: 'red'
}

export const Blue = Template.bind({})
Blue.args = {
  text: 'blue',
  color: 'blue'
}

export const Gray = Template.bind({})
Gray.args = {
  text: 'gray',
  color: 'gray'
}
