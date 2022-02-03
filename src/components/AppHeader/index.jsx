import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { AppIconHeaderFooter } from '../Icons'
import { space } from '../theme'

const AppLink = styled.a`
  padding: 0.5em 0.75em;
  border: 1px solid black;
  border-radius: 2em;
  color: black;
  cursor: pointer;
  text-decoration: none;

  ${props =>
    css`
      &:hover {
        color: ${props.theme.colors.core.primary};
        border-color: ${props.theme.colors.core.primary};
      }
    `}
`

export default function AppHeader({ homeHref, blogHref, codeHref, nodesHref }) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '50px'
      }}
    >
      <a href={homeHref}>
        <AppIconHeaderFooter iconStyle='dark' />
      </a>
      <nav
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          alignContent: 'flex-start',
          gap: space('default')
        }}
      >
        {blogHref && <AppLink href={blogHref}>Blog</AppLink>}
        {codeHref && <AppLink href={codeHref}>Code</AppLink>}
        {nodesHref && <AppLink href={nodesHref}>Nodes</AppLink>}
      </nav>
    </header>
  )
}

AppHeader.propTypes = {
  homeHref: PropTypes.string,
  blogHref: PropTypes.string,
  codeHref: PropTypes.string,
  nodesHref: PropTypes.string
}
