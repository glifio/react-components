import PropTypes from 'prop-types'
import Link from 'next/link'

// uses next/link for internal page routing
// uses <a> tag for external page routing
export function SmartLink({ href, children, ...restProps }: SmartLinkProps) {
  return href.charAt(0) === '/' ? (
    <Link href={href}>
      <a {...restProps}>{children}</a>
    </Link>
  ) : (
    <a href={href} target='_blank' rel='noreferrer noopener' {...restProps}>
      {children}
    </a>
  )
}

interface SmartLinkProps {
  href: string
  children: JSX.Element | Array<JSX.Element>
}

SmartLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
