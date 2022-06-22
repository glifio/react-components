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

const routerWithQuery2 = {
  query: { foo: 'bar', glif: 'ftw' },
  push: jest.fn()
} as unknown as NextRouter

describe('navigate', () => {
  test('it navigates to the URL', () => {
    navigate(router, { pageUrl: PAGE.HOME })
    expect(router.push).toHaveBeenCalledTimes(1)
    expect(router.push).toHaveBeenCalledWith(PAGE.HOME)
  })

  test('it discards existing query params by default', () => {
    navigate(routerWithQuery, { pageUrl: PAGE.HOME })
    expect(routerWithQuery.push).toHaveBeenCalledTimes(1)
    expect(routerWithQuery.push).toHaveBeenCalledWith(PAGE.HOME)
  })

  test('it retains existing query params when requested', () => {
    navigate(routerWithQuery, { pageUrl: PAGE.HOME, retainParams: true })
    expect(routerWithQuery.push).toHaveBeenCalledTimes(1)
    expect(routerWithQuery.push).toHaveBeenCalledWith(`${PAGE.HOME}?foo=bar`)
  })

  test('it adds new query params', () => {
    navigate(router, { pageUrl: PAGE.HOME, params: { test: 'abc' } })
    expect(router.push).toHaveBeenCalledTimes(1)
    expect(router.push).toHaveBeenCalledWith(`${PAGE.HOME}?test=abc`)
  })

  test('it discards existing query params when new ones are added', () => {
    navigate(routerWithQuery, { pageUrl: PAGE.HOME, params: { test: 'abc' } })
    expect(routerWithQuery.push).toHaveBeenCalledTimes(1)
    expect(routerWithQuery.push).toHaveBeenCalledWith(`${PAGE.HOME}?test=abc`)
  })

  test('it merges existing query params with new ones when retained', () => {
    navigate(routerWithQuery, {
      pageUrl: PAGE.HOME,
      params: { test: 'abc' },
      retainParams: true
    })
    expect(routerWithQuery.push).toHaveBeenCalledTimes(1)
    expect(routerWithQuery.push).toHaveBeenCalledWith(
      `${PAGE.HOME}?foo=bar&test=abc`
    )
  })

  test('it overwrites existing query params with new ones with the same name', () => {
    navigate(routerWithQuery, {
      pageUrl: PAGE.HOME,
      params: { foo: 'baz' },
      retainParams: true
    })
    expect(routerWithQuery.push).toHaveBeenCalledTimes(1)
    expect(routerWithQuery.push).toHaveBeenCalledWith(`${PAGE.HOME}?foo=baz`)
  })

  test('it adds multiple new query params, string and number', () => {
    navigate(router, {
      pageUrl: PAGE.HOME,
      params: { test1: 'abc', test2: 123, test3: 'xyz' }
    })
    expect(router.push).toHaveBeenCalledTimes(1)
    expect(router.push).toHaveBeenCalledWith(
      `${PAGE.HOME}?test1=abc&test2=123&test3=xyz`
    )
  })

  test('it adds new query params that are arrays of string and number', () => {
    navigate(router, {
      pageUrl: PAGE.HOME,
      params: { test1: ['a', 'b', 'c'], test2: [1, 2, 3] }
    })
    expect(router.push).toHaveBeenCalledTimes(1)
    expect(router.push).toHaveBeenCalledWith(
      `${PAGE.HOME}?test1=a&test1=b&test1=c&test2=1&test2=2&test2=3`
    )
  })

  test('it ignores invalid query params', () => {
    navigate(router, {
      pageUrl: PAGE.HOME,
      params: {
        test: NaN,
        test2: 'abc',
        test3: '',
        // @ts-ignore
        test4: null,
        // @ts-ignore
        test5: undefined
      }
    })
    expect(router.push).toHaveBeenCalledTimes(1)
    expect(router.push).toHaveBeenCalledWith(`${PAGE.HOME}?test2=abc`)
  })

  test('it handles retaining params, overwriting params and adding all new types at the same time', () => {
    navigate(routerWithQuery2, {
      pageUrl: PAGE.HOME,
      params: {
        foo: 'baz',
        test1: ['a', 'b', 'c'],
        test2: [1, 2, 3],
        test4: 'xyz',
        test5: 789
      },
      retainParams: true
    })
    expect(routerWithQuery2.push).toHaveBeenCalledTimes(1)
    expect(routerWithQuery2.push).toHaveBeenCalledWith(
      `${PAGE.HOME}?glif=ftw&foo=baz&test1=a&test1=b&test1=c&test2=1&test2=2&test2=3&test4=xyz&test5=789`
    )
  })
})
