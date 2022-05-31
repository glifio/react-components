import theme from '../../../theme'
import ThemeProvider from '../../../ThemeProvider'
import { CreateSeed } from '.'

export default {
  title: 'Connect/CreateSeed',
  component: CreateSeed,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <CreateSeed {...args}>{args.name}</CreateSeed>

export const Base = Template.bind({})
Base.args = {
  back: () => console.log('Clicked Back'),
  next: () => console.log('Clicked Next')
}
