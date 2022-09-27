import { render, screen } from '@testing-library/react'

import { Base } from './index.stories'

describe('AppHeader', () => {
  test('renders the box', () => {
    const { container } = render(<Base {...Base.args} />)
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Code')).toBeInTheDocument()
    expect(screen.getByText('Nodes')).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
