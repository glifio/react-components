import { NextRouter } from 'next/router'
import pick from 'lodash.pick'
import { Network } from '../../services/EnvironmentProvider'

export const getQueryParam = {
  string: (router: NextRouter, key: string): string => {
    const param = router?.query?.[key]
    if (!param) return ''
    if (Array.isArray(param)) return param[0]
    return param
  },
  number: (router: NextRouter, key: string): number => {
    const param = router?.query?.[key]
    if (!param) return NaN
    if (Array.isArray(param)) return Number(param[0])
    return Number(param)
  },
  stringArray: (router: NextRouter, key: string): Array<string> => {
    const param = router?.query?.[key]
    if (!param) return []
    if (Array.isArray(param)) return param
    return [param]
  },
  numberArray: (router: NextRouter, key: string): Array<number> => {
    const param = router?.query?.[key]
    if (!param) return []
    if (Array.isArray(param)) return param.map(p => Number(p))
    return [Number(param)]
  }
}

const appendQueryParam = (
  params: URLSearchParams,
  key: string,
  value: string | number
): void => {
  switch (typeof value) {
    case 'number':
      // Convert numbers to strings, ignore NaN
      if (!isNaN(value)) params.append(key, value.toString())
      return
    case 'string':
      // Ignore empty strings
      if (value) params.append(key, value.toString())
      return
  }
}

export const appendQueryParams = (
  url: string,
  params: Record<string, string | string[] | number | number[]>
): string => {
  // Return original url if no params are passed
  if (Object.keys(params).length === 0) return url

  // Get parameter string from input URL
  const [path, paramString] = url.split('?')

  // Create parameters object
  const paramObject = new URLSearchParams(paramString)

  // Add new parameters
  Object.entries(params).forEach(([key, value]) => {
    // Delete old value if exists
    if (paramObject.has(key)) paramObject.delete(key)
    // Append array values
    if (Array.isArray(value))
      value.forEach(v => appendQueryParam(paramObject, key, v))
    // Append single values
    else appendQueryParam(paramObject, key, value)
  })

  // Return URL with updated parameters
  const updatedParams = paramObject.toString()
  return updatedParams ? `${path}?${updatedParams}` : path
}

export const removeQueryParam = (url: string, key: string): string => {
  // Get parameter string from input URL
  const [path, paramString] = url.split('?')

  // Create parameters object
  const paramObject = new URLSearchParams(paramString)
  paramObject.delete(key)

  // Return URL with updated parameters
  const updatedParams = paramObject.toString()
  return updatedParams ? `${path}?${updatedParams}` : path
}

interface NavigateOptions {
  pageUrl: string
  params?: Record<string, string | string[] | number | number[]>
  retainParams?: boolean
}

export const glifParams = ['network']

export function navigate(
  router: NextRouter,
  { pageUrl, params, retainParams }: NavigateOptions
): void {
  const query = router?.query
  let updatedUrl = pageUrl

  if (query) {
    // Retain all query parameters or just the glifParams
    const retainedParams = retainParams ? query : pick(query, glifParams)
    updatedUrl = appendQueryParams(updatedUrl, retainedParams)
  }

  // Add new query params if passed
  if (params) updatedUrl = appendQueryParams(updatedUrl, params)

  router.push(updatedUrl)
}

export const resetWallet = () => {
  // A full page reload resets the wallet
  window?.location?.reload()
}

// note - we prefer to use network as query param > network as a path param
// all apps support network as a query param, but not all apps support network as a path param
export const switchNetworkUrl = (asPath: string, network: Network) => {
  // our apps can support both glif.io/<network>/address/<address> AND glif.io/address/<address>/?network=<network>
  // when we switch networks, we want to make sure we stick with the same routing protocol
  const supposedNetwork = asPath.split('/')[1]
  // if the network name was encoded in path we have to rebuild the URL without query params
  const networkInPath = Object.values(Network).some(
    net => net === supposedNetwork || net === `${supposedNetwork}net`
  )

  if (networkInPath) {
    // either get rid of the network name if switching to mainnet, or replace the network name with the new network
    const endPath = asPath.split('/').slice(2)
    return network === Network.MAINNET
      ? ['', ...endPath].join('/')
      : ['', network, ...endPath].join('/')
  }

  return network === Network.MAINNET
    ? removeQueryParam(asPath, 'network')
    : appendQueryParams(asPath, { network })
}
