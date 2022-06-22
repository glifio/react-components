import { render } from '@testing-library/react'
import { AddressLink } from './index'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

describe('Receive', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <AddressLink
          label='Safe Address'
          address='t137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizpy'
        />
      </ThemeProvider>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
