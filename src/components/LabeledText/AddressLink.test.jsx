import { render } from '@testing-library/react'
import { AddressLink } from './AddressLink'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { Environment } from '../../services/EnvironmentProvider'

describe('Receive', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <Environment>
        <ThemeProvider theme={theme}>
          <AddressLink
            label='Safe Address'
            address='t137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizpy'
          />
        </ThemeProvider>
      </Environment>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
