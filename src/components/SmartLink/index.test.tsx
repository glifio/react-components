import { render, act, getByRole, RenderResult } from '@testing-library/react'
import { SmartLink } from '.'

const linkText = 'Click me'
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: { foo: 'bar', glif: 'ftw' }
}))

describe('SmartLink', () => {
  test('it renders internal links correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(<SmartLink href='/home'>{linkText}</SmartLink>)
    })
    const link = getByRole(result!.container, 'link')
    expect(link).toHaveAttribute('href', '/home')
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
    expect(result!.container.firstChild).toMatchSnapshot()
  })

  test('it renders external links correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <SmartLink href='https://google.com'>{linkText}</SmartLink>
      )
    })
    const link = getByRole(result!.container, 'link')
    expect(link).toHaveAttribute('href', 'https://google.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
    expect(result!.container.firstChild).toMatchSnapshot()
  })

  test('it renders internal download links correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <SmartLink href='/favicon.ico' download>
          {linkText}
        </SmartLink>
      )
    })
    const link = getByRole(result!.container, 'link')
    expect(link).toHaveAttribute('href', '/favicon.ico')
    expect(link).toHaveAttribute('target', '_self')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
    expect(result!.container.firstChild).toMatchSnapshot()
  })

  test('it renders external download links correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <SmartLink href='http://localhost:6006/favicon.ico' download>
          {linkText}
        </SmartLink>
      )
    })
    const link = getByRole(result!.container, 'link')
    expect(link).toHaveAttribute('href', 'http://localhost:6006/favicon.ico')
    expect(link).toHaveAttribute('target', '_self')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
    expect(result!.container.firstChild).toMatchSnapshot()
  })

  test('it renders mailto links correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <SmartLink href='mailto:squad@glif.io'>{linkText}</SmartLink>
      )
    })
    const link = getByRole(result!.container, 'link')
    expect(link).toHaveAttribute('href', 'mailto:squad@glif.io')
    expect(link).toHaveAttribute('target', '_self')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
    expect(result!.container.firstChild).toMatchSnapshot()
  })

  test('it renders tel links correctly', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(<SmartLink href='tel:+4733378901'>{linkText}</SmartLink>)
    })
    const link = getByRole(result!.container, 'link')
    expect(link).toHaveAttribute('href', 'tel:+4733378901')
    expect(link).toHaveAttribute('target', '_self')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
    expect(result!.container.firstChild).toMatchSnapshot()
  })

  test('it can retain params for internal links', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <SmartLink href='/home' retainParams>
          {linkText}
        </SmartLink>
      )
    })
    const link = getByRole(result!.container, 'link')
    expect(link).toHaveAttribute('href', '/home?foo=bar&glif=ftw')
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
    expect(result!.container.firstChild).toMatchSnapshot()
  })

  test("it doesn't retain params for external links", async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <SmartLink href='https://google.com' retainParams>
          {linkText}
        </SmartLink>
      )
    })
    const link = getByRole(result!.container, 'link')
    expect(link).toHaveAttribute('href', 'https://google.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
    expect(result!.container.firstChild).toMatchSnapshot()
  })

  test('it can add params to internal links', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <SmartLink
          href='/home'
          params={{
            test1: ['a', 'b'],
            test2: [1, 2],
            test3: 'abc',
            test4: 123
          }}
        >
          {linkText}
        </SmartLink>
      )
    })
    const link = getByRole(result!.container, 'link')
    expect(link).toHaveAttribute(
      'href',
      '/home?test1=a&test1=b&test2=1&test2=2&test3=abc&test4=123'
    )
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
    expect(result!.container.firstChild).toMatchSnapshot()
  })

  test('it can add params to external links', async () => {
    let result: RenderResult | null = null
    await act(async () => {
      result = render(
        <SmartLink
          href='https://google.com'
          params={{
            test1: ['a', 'b'],
            test2: [1, 2],
            test3: 'abc',
            test4: 123
          }}
        >
          {linkText}
        </SmartLink>
      )
    })
    const link = getByRole(result!.container, 'link')
    expect(link).toHaveAttribute(
      'href',
      'https://google.com?test1=a&test1=b&test2=1&test2=2&test3=abc&test4=123'
    )
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
    expect(result!.container.firstChild).toMatchSnapshot()
  })
})
