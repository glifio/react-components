import { render } from '@testing-library/react'

import { Base } from './InlineBox.stories'

it('renders without error', () => {
  render(<Base {...Base.args} />)
})
