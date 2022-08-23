import { NextRouter } from 'next/router'
import pick from 'lodash.pick'

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
    appendQueryParams(updatedUrl, retainedParams)
  }

  // Add new query params if passed
  if (params) updatedUrl = appendQueryParams(updatedUrl, params)

  router.push(updatedUrl)
}

export const resetWallet = () => {
  // A full page reload resets the wallet
  window?.location?.reload()
}
