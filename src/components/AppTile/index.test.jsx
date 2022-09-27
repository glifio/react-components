import { render, screen } from '@testing-library/react'
import { Safe } from './index.stories'

describe('AppTile', () => {
  test('renders the AppTile', () => {
    const { container } = render(<Safe {...Safe.args} />)
    expect(screen.getByText(Safe.args.title)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
