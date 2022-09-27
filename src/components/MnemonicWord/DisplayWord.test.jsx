import { render } from '@testing-library/react'

import { Base } from './DisplayWord.stories'

describe('Box', () => {
  test('renders the story', () => {
    const { container } = render(<Base {...Base.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
