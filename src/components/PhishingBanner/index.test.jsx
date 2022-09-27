import { render, screen } from '@testing-library/react'

import { Base } from './index.stories'

describe('Phishing Banner', () => {
  test('renders the phishing banner', () => {
    const { container } = render(<Base {...Base.args} />)
    expect(screen.getByText(/glif.io/)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
