import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { AppIconHeaderFooter } from '../Icons'
import { space } from '../theme'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: ${space('default')};
  gap: ${space('large')};
`

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-end;
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

export default function AppHeader(props: AppHeaderProps) {
  const {
    homeUrl,
    blogUrl,
    codeUrl,
    nodesUrl,
    safeUrl,
    walletUrl,
    verifierUrl,
    explorerUrl
  } = props
  return (
    <Header>
      <a href={homeUrl}>
        <AppIconHeaderFooter iconStyle='dark' />
      </a>
      <Nav>
        {blogUrl && <Link href={blogUrl}>Blog</Link>}
        {codeUrl && <Link href={codeUrl}>Code</Link>}
        {nodesUrl && <Link href={nodesUrl}>Nodes</Link>}
        {safeUrl && <Link href={safeUrl}>Safe</Link>}
        {walletUrl && <Link href={walletUrl}>Wallet</Link>}
        {verifierUrl && <Link href={verifierUrl}>Verifier</Link>}
        {explorerUrl && <Link href={explorerUrl}>Explorer</Link>}
      </Nav>
    </Header>
  )
}

interface AppHeaderProps {
  homeUrl: string
  blogUrl?: string
  codeUrl?: string
  nodesUrl?: string
  safeUrl?: string
  walletUrl?: string
  verifierUrl?: string
  explorerUrl?: string
}

AppHeader.propTypes = {
  homeUrl: PropTypes.string,
  blogUrl: PropTypes.string,
  codeUrl: PropTypes.string,
  nodesUrl: PropTypes.string,
  safeUrl: PropTypes.string,
  walletUrl: PropTypes.string,
  verifierUrl: PropTypes.string,
  explorerUrl: PropTypes.string
}

AppHeader.defaultProps = {
  homeUrl: '/'
}
