import { render } from '@testing-library/react'
import { Base } from './index.stories'

describe('Tooltip', () => {
  test('storybook example renders', () => {
    const { container } = render(<Base {...Base.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
