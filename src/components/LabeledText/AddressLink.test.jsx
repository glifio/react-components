import { ApolloProvider } from '@apollo/client'
import { render } from '@testing-library/react'
import { AddressLink } from './AddressLink'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { client } from '../HistoryTables/apolloClient'
import { TestEnvironment } from '../../test-utils/TestEnvironment'

describe('AddressLink', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <TestEnvironment>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <AddressLink
              label='Safe Address'
              address='t137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizpy'
            />
          </ApolloProvider>
        </ThemeProvider>
      </TestEnvironment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
