import { NextRouter } from 'next/router'

const appendParam = (
  params: URLSearchParams,
  key: string,
  value: string | number
): void => {
  const valueStr = typeof value === 'number' ? value.toString() : value
  params.append(key, valueStr)
}

export const appendParams = (
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
      value.forEach(v => appendParam(paramObject, key, v))
    // Append single values
    else appendParam(paramObject, key, value)
  })

  // Return URL with updated parameters
  const updatedParams = params.toString()
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
  if (retainParams) updatedUrl = appendParams(updatedUrl, router.query)

  // Add new query params if passed
  if (params) updatedUrl = appendParams(updatedUrl, params)

  router.push(updatedUrl)
}

export const resetWallet = (): void => {
  // perform a hard reload of the landing page without path and parameters
  window.location.assign(`${window.location.protocol}//${window.location.host}`)
}
