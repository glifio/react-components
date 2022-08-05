import { useMemo, ReactNode, MouseEvent, useCallback } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { appendQueryParams } from '../../utils'

const isAbsoluteUrlRegex = new RegExp('^(?:[a-z]+:)?//', 'i')
const isMailOrTelUrlRegex = new RegExp('^(mailto|tel):.*', 'i')

// uses next/link for internal page routing
// uses <a> tag for external page routing
export const SmartLink = ({
  children,
  href,
  download,
  className,
  stopPropagation,
  params,
  retainParams,
  onClick
}: SmartLinkProps) => {
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

  const onClickProxy = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      stopPropagation && e.stopPropagation()
      onClick(e)
    },
    [stopPropagation, onClick]
  )

  return isInternalUrl && !download ? (
    <Link href={hrefWithParams}>
      <a className={className} onClick={onClickProxy}>
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
      onClick={onClickProxy}
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
  stopPropagation?: boolean
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
  stopPropagation: PropTypes.bool,
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
  // "href" needs a default value even though the prop
  // is required, because in some cases an environment
  // variable is passed which can resolve to "undefined"
  // See: https://github.com/vercel/next.js/issues/16107
  href: '',
  stopPropagation: true,
  onClick: () => {}
}
