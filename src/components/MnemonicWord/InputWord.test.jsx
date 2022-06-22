import { render } from '@testing-library/react'

import theme from '../theme'
import ThemeProvider from '../ThemeProvider'
import { Base } from './InputWord.stories'

describe('Box', () => {
  test('renders the story', () => {
    const mockSetCorrectWordCount = jest.fn()
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Base {...Base.args} setCorrectWordCount={mockSetCorrectWordCount} />
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
