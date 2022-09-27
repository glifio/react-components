import { render } from '@testing-library/react'
import { LabeledLink } from './LabeledLink'

describe('LabeledLink', () => {
  test('it renders correctly', () => {
    const { container } = render(
      <LabeledLink
        label='Glif Safe'
        href='https://safe.glif.link/'
        linkText='safe.glif.link'
        copyText='https://safe.glif.link/'
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
