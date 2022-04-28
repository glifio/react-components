import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { SmartLink } from './SmartLink'

export default {
  title: 'Link/SmartLink',
  component: SmartLink,
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
      <SmartLink {...args}>{args.name}</SmartLink>
    </>
  )
}

export const Base = Template.bind({})
Base.args = {
  href: 'https://google.com',
  name: 'Click here'
}
