import theme from '../../../theme'
import ThemeProvider from '../../../ThemeProvider'
import { ImportPk } from '.'

export default {
  title: 'Connect/ImportPrivateKey',
  component: ImportPk,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <ImportPk {...args} />

export const Base = Template.bind({})
Base.args = {
  back: () => console.log('Clicked Back'),
  next: () => console.log('Clicked Next')
}
