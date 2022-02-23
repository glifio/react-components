import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { AppIconHeaderFooter } from '../Icons'
import { space } from '../theme'
import ButtonV2 from '../Button/V2'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
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

const Back = styled(ButtonV2)`
  border-radius: 2em;
`

export default function AppHeader(props: AppHeaderProps) {
  const router = useRouter()
  const {
    back,
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
      {homeUrl ? (
        <a href={homeUrl}>
          <AppIconHeaderFooter iconStyle='dark' />
        </a>
      ) : (
        <AppIconHeaderFooter iconStyle='dark' />
      )}
      <Nav>
        {back && <Back onClick={back === true ? router.back : back}>Home</Back>}
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

export interface AppHeaderProps {
  back?: boolean | (() => void)
  homeUrl?: string
  blogUrl?: string
  codeUrl?: string
  nodesUrl?: string
  safeUrl?: string
  walletUrl?: string
  verifierUrl?: string
  explorerUrl?: string
}

AppHeader.propTypes = {
  back: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  homeUrl: PropTypes.string,
  blogUrl: PropTypes.string,
  codeUrl: PropTypes.string,
  nodesUrl: PropTypes.string,
  safeUrl: PropTypes.string,
  walletUrl: PropTypes.string,
  verifierUrl: PropTypes.string,
  explorerUrl: PropTypes.string
}
