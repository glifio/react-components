import '@glif/base-css'
import ThemeProvider from '../src/components/ThemeProvider'
import theme from '../src/components/theme'
import { ErrorBoundary } from '../src/components/ErrorBoundary'
import { TestEnvironment } from '../src/test-utils/TestEnvironment'
import { ApolloWrapper } from '../src/utils'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

export const decorators = [
  Story => (
    <TestEnvironment>
      <ApolloWrapper>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Story />
          </ErrorBoundary>
        </ThemeProvider>
      </ApolloWrapper>
    </TestEnvironment>
  )
]
