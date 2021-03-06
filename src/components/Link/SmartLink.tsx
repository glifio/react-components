import { useMemo, ReactNode, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { appendQueryParams } from '../../utils'

const isAbsoluteUrlRegex = new RegExp('^(?:[a-z]+:)?//', 'i')
const isMailOrTelUrlRegex = new RegExp('^(mailto|tel):.*', 'i')

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

  const isMailToOrTelUrl = useMemo<boolean>(
    () => isMailOrTelUrlRegex.test(href),
    [href]
  )
  const isInternalUrl = useMemo<boolean>(
    () => !isAbsoluteUrlRegex.test(href) && !isMailToOrTelUrl,
    [href, isMailToOrTelUrl]
  )

  const hrefWithParams = useMemo<string>(() => {
    let updatedHref = href

    // Add existing query params if retained
    if (query && isInternalUrl && retainParams)
      updatedHref = appendQueryParams(updatedHref, query)

    // Add new query params if passed
    if (params) updatedHref = appendQueryParams(updatedHref, params)

    return updatedHref
  }, [query, isInternalUrl, href, params, retainParams])

  return isInternalUrl && !download ? (
    <Link href={hrefWithParams}>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </Link>
  ) : (
    <a
      target={download || isMailToOrTelUrl ? '_self' : '_blank'}
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
  href: string
  download?: boolean | string
  className?: string
  params?: Record<string, string | string[] | number | number[]>
  retainParams?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export const SmartLinkPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string.isRequired,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  params: PropTypes.objectOf(
    PropTypes.oneOfType([
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
SmartLink.defaultProps = {
  href: ''
}
