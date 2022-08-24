import '@glif/base-css'
import ThemeProvider from '../src/components/ThemeProvider'
import theme from '../src/components/theme'
import { TestEnvironment } from '../src/test-utils/TestEnvironment'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

export const decorators = [
  Story => (
    <TestEnvironment>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </TestEnvironment>
  )
]
