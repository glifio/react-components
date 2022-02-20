import { render, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ThemeProvider from '../ThemeProvider'
import theme from '../theme'
import { Base } from './index.stories'

describe('AppHeader', () => {
  afterEach(cleanup)
  test('renders the box', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Base {...Base.args} />
      </ThemeProvider>
    )
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Code')).toBeInTheDocument()
    expect(screen.getByText('Nodes')).toBeInTheDocument()
    expect(screen.getByText('Safe')).toBeInTheDocument()
    expect(screen.getByText('Wallet')).toBeInTheDocument()
    expect(screen.getByText('Verifier')).toBeInTheDocument()
    expect(screen.getByText('Explorer')).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
