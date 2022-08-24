import Footer from './index'

export default {
  title: 'Footer/Footer',
  component: Footer,
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <Footer {...args} />

export const Base = Template.bind({})
Base.args = {}
