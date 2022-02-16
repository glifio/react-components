import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { AppIconHeaderFooter } from '../Icons'
import { space } from '../theme'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`

const Nav = styled.nav`
  display: flex;
  align-items: flex-start;
  gap: ${space('default')};
`

const Link = styled.a`
  padding: 0.5em 0.75em;
  color: black;
  border: 1px solid black;
  border-radius: 2em;
  text-decoration: none;
  ${props =>
    css`
      &:hover {
        color: ${props.theme.colors.core.primary};
        border-color: ${props.theme.colors.core.primary};
      }
      &:active {
        color: white;
        background: ${props.theme.colors.core.primary};
      }
    `}
`

export default function AppHeader({ homeHref, appLinks }: AppHeaderProps) {
  return (
    <Header>
      <a href={homeHref}>
        <AppIconHeaderFooter iconStyle='dark' />
      </a>
      <Nav>
        {appLinks.map((link, index) => (
          <Link key={index} href={link.href}>
            {link.text}
          </Link>
        ))}
      </Nav>
    </Header>
  )
}

interface AppLink {
  text: string
  href: string
}

interface AppHeaderProps {
  homeHref: string
  appLinks: Array<AppLink>
}

const APP_LINK = PropTypes.shape({
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
})

AppHeader.propTypes = {
  homeHref: PropTypes.string,
  appLinks: PropTypes.arrayOf(APP_LINK)
}

AppHeader.defaultProps = {
  homeHref: '/',
  appLinks: []
}
