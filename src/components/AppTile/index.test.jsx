import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ThemeProvider from '../ThemeProvider'
import theme from '../theme'

import { Safe } from './index.stories'

describe('AppTile', () => {
  afterEach(cleanup)
  test('renders the AppTile', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Safe {...Safe.args} />
      </ThemeProvider>
    )
    expect(screen.getByText(Safe.args.title)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
