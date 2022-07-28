import { render } from '@testing-library/react'
import LoadingScreen from '.'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

describe('LoadingScreen', () => {
  test('renders the story', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <LoadingScreen />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
