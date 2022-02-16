import { render, cleanup } from '@testing-library/react'
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
    expect(container.firstChild).toMatchSnapshot()
  })
})
