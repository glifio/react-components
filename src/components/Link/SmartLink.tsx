import { ReactNode } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

// uses next/link for internal page routing
// uses <a> tag for external page routing
export function SmartLink({
  href,
  children,
  className,
  onClick
}: SmartLinkProps) {
  return href.charAt(0) === '/' ? (
    <Link href={href}>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </Link>
  ) : (
    <a
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

interface SmartLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: (...args: any[]) => void
}

SmartLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func
}
