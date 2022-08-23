import { Environment } from '../../services'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import Footer from './index'

export default {
  title: 'Footer/Footer',
  component: Footer,
  decorators: [
    Story => (
      <Environment>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </Environment>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <Footer {...args} />

export const Base = Template.bind({})
Base.args = {}
