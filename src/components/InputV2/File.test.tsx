import { render, act, RenderResult } from '@testing-library/react'
import { FileInput } from './File'

describe('File input', () => {
  test('it renders correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(<FileInput label='Any file' />)
    })
    expect(result.container.firstChild).toMatchSnapshot()
  })
})
