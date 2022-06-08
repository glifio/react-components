import { render, cleanup, screen } from '@testing-library/react'

import ThemeProvider from '../ThemeProvider'
import theme from '../theme'
import { Base } from './index.stories'

describe('Phishing Banner', () => {
  afterEach(cleanup)
  test('renders the phishing banner', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Base {...Base.args} />
      </ThemeProvider>
    )
    expect(screen.getByText(/glif.io/)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
