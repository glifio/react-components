import { render, cleanup } from '@testing-library/react'

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
