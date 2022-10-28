import { NextRouter } from 'next/router'
import { getQueryParam, navigate, removeQueryParam, switchNetworkUrl } from '.'
import { Network } from '../../services/EnvironmentProvider'

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

const routerWithQuery3 = {
  query: {
    test1: ['a', 'b', 'c'],
    test2: ['1', '2', '3'],
    test3: 'xyz',
    test4: '789'
  },
  push: jest.fn()
} as unknown as NextRouter

describe('getParam', () => {
  test('getQueryParam.string', () => {
    expect(getQueryParam.string(routerWithQuery3, 'test0')).toBe('')
    expect(getQueryParam.string(routerWithQuery3, 'test1')).toBe('a')
    expect(getQueryParam.string(routerWithQuery3, 'test2')).toBe('1')
    expect(getQueryParam.string(routerWithQuery3, 'test3')).toBe('xyz')
    expect(getQueryParam.string(routerWithQuery3, 'test4')).toBe('789')
  })
  test('getQueryParam.number', () => {
    expect(getQueryParam.number(routerWithQuery3, 'test0')).toBe(NaN)
    expect(getQueryParam.number(routerWithQuery3, 'test1')).toBe(NaN)
    expect(getQueryParam.number(routerWithQuery3, 'test2')).toBe(1)
    expect(getQueryParam.number(routerWithQuery3, 'test3')).toBe(NaN)
    expect(getQueryParam.number(routerWithQuery3, 'test4')).toBe(789)
  })
  test('getQueryParam.stringArray', () => {
    expect(getQueryParam.stringArray(routerWithQuery3, 'test0')).toEqual([])
    expect(getQueryParam.stringArray(routerWithQuery3, 'test1')).toEqual([
      'a',
      'b',
      'c'
    ])
    expect(getQueryParam.stringArray(routerWithQuery3, 'test2')).toEqual([
      '1',
      '2',
      '3'
    ])
    expect(getQueryParam.stringArray(routerWithQuery3, 'test3')).toEqual([
      'xyz'
    ])
    expect(getQueryParam.stringArray(routerWithQuery3, 'test4')).toEqual([
      '789'
    ])
  })
  test('getQueryParam.numberArray', () => {
    expect(getQueryParam.numberArray(routerWithQuery3, 'test0')).toEqual([])
    expect(getQueryParam.numberArray(routerWithQuery3, 'test1')).toEqual([
      NaN,
      NaN,
      NaN
    ])
    expect(getQueryParam.numberArray(routerWithQuery3, 'test2')).toEqual([
      1, 2, 3
    ])
    expect(getQueryParam.numberArray(routerWithQuery3, 'test3')).toEqual([NaN])
    expect(getQueryParam.numberArray(routerWithQuery3, 'test4')).toEqual([789])
  })
})

describe('removeQueryParam', () => {
  test('it removes a query param', () => {
    const URL = 'https://wallet.glif.io/?network=wallaby'
    expect(removeQueryParam(URL, 'network')).toBe('https://wallet.glif.io/')
  })

  test('it leaves the URL alone when the query param to remove does not exist', () => {
    const URL = 'https://wallet.glif.io/'
    expect(removeQueryParam(URL, 'network')).toBe(URL)
  })
})

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
        test1: NaN,
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
        test3: 'xyz',
        test4: 789
      },
      retainParams: true
    })
    expect(routerWithQuery2.push).toHaveBeenCalledTimes(1)
    expect(routerWithQuery2.push).toHaveBeenCalledWith(
      `${PAGE.HOME}?glif=ftw&foo=baz&test1=a&test1=b&test1=c&test2=1&test2=2&test2=3&test3=xyz&test4=789`
    )
  })
  describe('switchNetworkUrl', () => {
    test('it can switch from mainnet to another network via query params', () => {
      const url = '/address/t0100/'
      expect(switchNetworkUrl(url, Network.WALLABY)).toBe(
        '/address/t0100/?network=wallabynet'
      )
    })
    test('it can switch from another network to mainnet via query params', () => {
      const url = '/address/t0100/?network=wallaby'
      expect(switchNetworkUrl(url, Network.MAINNET)).toBe('/address/t0100/')
    })
    test('it can switch from another network to mainnet via path params', () => {
      const expected = '/address/t0100/'
      const url = '/wallabynet/address/t0100/'
      const url2 = '/wallaby/address/t0100/'
      expect(switchNetworkUrl(url, Network.MAINNET)).toBe(expected)
      expect(switchNetworkUrl(url2, Network.MAINNET)).toBe(expected)
    })
    test('it can switch from one non mainnet network to another non mainnet network via path params', () => {
      const url = '/calibration/address/t0100/'
      expect(switchNetworkUrl(url, Network.WALLABY)).toBe(
        '/wallabynet/address/t0100/'
      )
    })
  })
})
