import { LoadingScreen } from './LoadingScreen'

export default {
  title: 'Loading/LoadingScreen',
  component: LoadingScreen
}

const Template = args => <LoadingScreen {...args} />

export const Base = Template.bind({})
Base.args = {}
