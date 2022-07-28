import { LabeledText } from '.'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'LabeledText/LabeledText',
  component: LabeledText,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <LabeledText {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Balance',
  text: '100 FIL'
}
