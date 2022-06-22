import { NextRouter } from 'next/router'
import { navigate } from '.'

enum PAGE {
  LANDING = '/',
  HOME = '/home'
}

const router = {
  push: jest.fn()
} as unknown as NextRouter

const routerWithQuery = {
  query: { foo: 'bar' },
  push: jest.fn()
} as unknown as NextRouter

describe('navigate', () => {

  test('it navigates to the URL', () => {
    navigate(router, { pageUrl: PAGE.HOME })
    expect(router.push).toHaveBeenCalledTimes(1)
    expect(router.push).toHaveBeenCalledWith(PAGE.HOME)
  })

  test('expect existing query params to be discarded by default', () => {
    navigate(routerWithQuery, { pageUrl: PAGE.HOME })
    expect(routerWithQuery.push).toHaveBeenCalledTimes(1)
    expect(routerWithQuery.push).toHaveBeenCalledWith(PAGE.HOME)
  })

  test('expect existing query params to be retained if specified', () => {
    navigate(routerWithQuery, { pageUrl: PAGE.HOME, retainParams: true })
    expect(routerWithQuery.push).toHaveBeenCalledTimes(1)
    expect(routerWithQuery.push).toHaveBeenCalledWith(`${PAGE.HOME}?foo=bar`)
  })
})
