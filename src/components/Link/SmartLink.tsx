import { useMemo, ReactNode } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'

const absoluteUrlRegex = new RegExp('^(?:[a-z]+:)?//', 'i')

// uses next/link for internal page routing
// uses <a> tag for external page routing
export function SmartLink({
  children,
  href,
  download,
  className,
  params,
  retainParams,
  onClick
}: SmartLinkProps) {
  const router = useRouter()
  const query = router?.query

  const isInternalLink = useMemo<boolean>(
    // href can be undefined for a download button
    () => (!href ? false : absoluteUrlRegex.test(href)),
    [href]
  )

  const hrefWithParams = useMemo<string>(() => {
    // Don't alter absolute URLs or when not retaining params
    if (isAbsolute || !retainParams.length) return href

    // Get query params from passed href
    const [path, paramString] = href.split('?')

    // Create parameters object
    const params = new URLSearchParams(paramString)

    // Add retained parameters
    retainParams.forEach(param => {
      if (param in query && !params.has(param))
        params.set(param, query[param] as string)
    })

    // Return final URL with updated params
    const updatedParams = params.toString()
    return updatedParams ? `${path}?${updatedParams}` : path
  }, [query, isAbsolute, href, retainParams])

  return isInternalLink ? (
    <Link href={hrefWithParams}>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </Link>
  ) : (
    <a
      target='_blank'
      rel='noreferrer noopener'
      href={hrefWithParams}
      download={download}
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export interface SmartLinkProps {
  children: ReactNode
  href?: string
  download?: string
  className?: string
  params?: Record<string, string | string[] | number | number[]>
  retainParams?: boolean
  onClick?: () => void
}

export const SmartLinkPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string,
  download: PropTypes.string,
  className: PropTypes.string,
  params: PropTypes.objectOf(
    PropTypes.oneOf([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number)
    ])
  ),
  retainParams: PropTypes.bool,
  onClick: PropTypes.func
}

SmartLink.propTypes = SmartLinkPropTypes
