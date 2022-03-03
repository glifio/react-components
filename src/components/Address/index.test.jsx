import { cleanup, render } from '@testing-library/react'
import Address from '.'
import noop from '../../utils/noop'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

describe('Receive', () => {
  afterEach(cleanup)

  test('it renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Address
          label='Safe Address'
          address='t137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizpy'
          urlPrefix='/'
          close={noop}
        />
      </ThemeProvider>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
