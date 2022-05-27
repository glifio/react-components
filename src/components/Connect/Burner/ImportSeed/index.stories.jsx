import theme from '../../../theme'
import ThemeProvider from '../../../ThemeProvider'
import InputMnemonic from './'

export default {
  title: 'Connect/ImportSeed',
  component: InputMnemonic,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => {
  return (
    <>
      <InputMnemonic {...args}>{args.name}</InputMnemonic>
    </>
  )
}

export const Base = Template.bind({})
