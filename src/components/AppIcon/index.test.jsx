import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ThemeProvider from '../ThemeProvider'
import theme from '../theme'
import AppIcon from './index'

describe('AppIcon', () => {
  afterEach(cleanup)
  test('renders the AppIcon', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <AppIcon />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
