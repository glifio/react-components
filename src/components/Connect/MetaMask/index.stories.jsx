import { MetaMask } from '.'

export default {
  title: 'Connect/MetaMask',
  component: MetaMask
}

const Template = args => <MetaMask {...args} />

export const Base = Template.bind({})
Base.args = {
  back: () => console.log('Clicked Back'),
  next: () => console.log('Clicked Next')
}
