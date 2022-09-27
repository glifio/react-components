import { render } from '@testing-library/react'
import Glyph from '.'
import { Base } from './index.stories'

describe('Glyph', () => {
  test('renders the story', () => {
    const { container } = render(<Base {...Base.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders the glyph', () => {
    const { container } = render(
      <Glyph
        acronym='Sw'
        bg='core.primary'
        borderColor='core.primary'
        color='core.white'
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders the glyph with the text', () => {
    const { getByText } = render(
      <Glyph
        acronym='Sw'
        bg='core.primary'
        borderColor='core.primary'
        color='core.white'
      />
    )

    expect(getByText('Sw')).toBeTruthy()
  })
})
