import '@glif/base-css'
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
        <ErrorBoundary>
          <Story />
        </ErrorBoundary>
      </ApolloWrapper>
    </TestEnvironment>
  )
]
