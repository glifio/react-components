import theme from '../../../../theme'
import ThemeProvider from '../../../../ThemeProvider'
import { OneColumnCentered, WideDialog, ShadowBox } from '../../../../Layout'
import RevealMnemonic from './RevealMnemonic'

export default {
  title: 'Connect/RevealMnemonic',
  component: RevealMnemonic,
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <OneColumnCentered>
          <WideDialog>
            <ShadowBox>{Story()}</ShadowBox>
          </WideDialog>
        </OneColumnCentered>
      </ThemeProvider>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <RevealMnemonic {...args} />

export const Base = Template.bind({})
Base.args = {
  mnemonic:
    'casino hover time demand slim wonder chunk embrace actual theory dolphin spray mail runway blouse arrest love adult yellow popular screen maid opera select',
  valid: false
}
