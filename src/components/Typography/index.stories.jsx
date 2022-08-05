import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

import {
  Title as TitleComp,
  Text as TextComp
} from './index'

export default {
  title: 'Typography/Typography',
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

export const Title = args => <TitleComp {...args} />
Title.args = {
  children: <>Hello world</>
}
Title.component = TitleComp
Title.title = 'Typography/Title'

export const Text = args => <TextComp {...args} />
Text.args = {
  children: <>Hello world</>
}
Text.component = TextComp
Text.title = 'Typography/Text'
