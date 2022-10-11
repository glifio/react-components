import { StatusIcon } from './StatusIcon'

export default {
  title: 'Layout/StatusIcon',
  component: StatusIcon
}

const Template = args => <StatusIcon {...args} />

export const Purple = Template.bind({})
Purple.args = {
  color: 'purple'
}

export const Green = Template.bind({})
Green.args = {
  color: 'green'
}

export const Yellow = Template.bind({})
Yellow.args = {
  color: 'yellow'
}

export const Red = Template.bind({})
Red.args = {
  color: 'red'
}

export const Blue = Template.bind({})
Blue.args = {
  color: 'blue'
}

export const Gray = Template.bind({})
Gray.args = {
  color: 'gray'
}
