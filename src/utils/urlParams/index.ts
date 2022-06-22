import { NextRouter } from 'next/router'

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

interface NavigateOptions {
  pageUrl: string
  params?: Record<string, string | string[] | number | number[]>
  retainParams?: boolean
}

export function navigate(
  router: NextRouter,
  { pageUrl, params, retainParams }: NavigateOptions
): void {
  let updatedUrl = pageUrl

  // Add existing query params if retained
  if (router.query && retainParams)
    updatedUrl = appendQueryParams(updatedUrl, router.query)

  // Add new query params if passed
  if (params) updatedUrl = appendQueryParams(updatedUrl, params)

  router.push(updatedUrl)
}

export const resetWallet = () => {
  // A full page reload resets the wallet
  window?.location?.reload()
}
