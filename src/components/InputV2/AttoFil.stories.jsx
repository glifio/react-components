import { AttoFilInput } from './AttoFil'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/AttoFil',
  component: AttoFilInput,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <AttoFilInput {...args} />

const sharedArgs = {
  autofocus: true,
  controlled: false
}

export const Base = Template.bind({})
Base.args = {
  ...sharedArgs,
  label: 'Enter an amount'
}
