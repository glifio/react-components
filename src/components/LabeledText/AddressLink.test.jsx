import { render } from '@testing-library/react'
import { AddressLink } from './AddressLink'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { TestEnvironment } from '../../../../test-utils/TestEnvironment'

describe('Receive', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <TestEnvironment>
        <ThemeProvider theme={theme}>
          <AddressLink
            label='Safe Address'
            address='t137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizpy'
          />
        </ThemeProvider>
      </TestEnvironment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
