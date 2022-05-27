import { ReactNode } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

// uses next/link for internal page routing
// uses <a> tag for external page routing
export function SmartLink({
  children,
  href,
  download,
  className,
  onClick
}: SmartLinkProps) {
  return href?.charAt(0) === '/' ? (
    <Link href={href}>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </Link>
  ) : (
    <a
      target='_blank'
      rel='noreferrer noopener'
      href={href}
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
  onClick: PropTypes.func
}

SmartLink.propTypes = SmartLinkPropTypes
SmartLink.defaultProps = {
  onClick: () => {}
}
