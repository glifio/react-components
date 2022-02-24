import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { AppIconHeaderFooter } from '../Icons'
import { space } from '../theme'
import ButtonV2 from '../Button/V2'
import AppIconWrapper from './AppIconWrapper'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space()};
  svg {
    display: block;
  }
`

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${space('large')};

  > * {
    align-items: flex-end;
  }
`

const SubHeader = styled(Header)`
  position: sticky;
  top: -1px;
  z-index: 100;
  padding-top: ${space()};
  border-top: 1px solid black;
  background-color: var(--white-broken);

  > * {
    align-items: flex-start;
  }
`

const NavLeft = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${space()};
`

const NavRight = styled(NavLeft)`
  justify-content: flex-end;
`

const NavLinkSimple = styled.a`
  color: black;
  text-decoration: none;
  &:hover {
    color: black;
  }
`

const NavLinkRound = styled(NavLinkSimple)`
  padding: 0.5em 0.75em;
  border: 1px solid black;
  border-radius: 2em;
  &:hover {
    color: var(--purple-medium);
    border-color: var(--purple-medium);
  }
  &:active {
    color: white;
    background: var(--purple-medium);
  }
`

const NavButton = styled(ButtonV2)`
  border-radius: 2em;
`

export default function AppHeader(props: AppHeaderProps) {
  const router = useRouter()
  const {
    back,
    logout,
    connection,
    appTitle,
    appIcon,
    appUrl,
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
    <Wrapper>
      <Header>
        <NavLeft>
          {homeUrl && (
            <NavLinkSimple href={homeUrl}>
              <AppIconHeaderFooter iconStyle='dark' />
            </NavLinkSimple>
          )}
          {appTitle && appIcon && appUrl && (
            <NavLinkSimple href={appUrl}>
              <AppIconWrapper title={appTitle}>
                {appIcon}
              </AppIconWrapper>
            </NavLinkSimple>
          )}
        </NavLeft>
        <NavRight>
          {blogUrl && <NavLinkRound href={blogUrl}>Blog</NavLinkRound>}
          {codeUrl && <NavLinkRound href={codeUrl}>Code</NavLinkRound>}
          {nodesUrl && <NavLinkRound href={nodesUrl}>Nodes</NavLinkRound>}
          {safeUrl && <NavLinkRound href={safeUrl}>Safe</NavLinkRound>}
          {walletUrl && <NavLinkRound href={walletUrl}>Wallet</NavLinkRound>}
          {verifierUrl && <NavLinkRound href={verifierUrl}>Verifier</NavLinkRound>}
          {explorerUrl && <NavLinkRound href={explorerUrl}>Explorer</NavLinkRound>}
        </NavRight>
      </Header>
      <SubHeader>
        <NavLeft>
          {logout && <NavButton onClick={logout}>Logout</NavButton>}
          {back && <NavButton onClick={back === true ? router.back : back}>Back</NavButton>}
          {connection || <></>}
        </NavLeft>
        <NavRight>
        </NavRight>
      </SubHeader>
    </Wrapper>
  )
}

export interface AppHeaderProps {
  back?: boolean | (() => void)
  logout?: () => void
  connection?: JSX.Element
  appTitle?: string
  appIcon?: JSX.Element
  appUrl?: string
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
  logout: PropTypes.func,
  connection: PropTypes.node,
  appTitle: PropTypes.string,
  appIcon: PropTypes.node,
  appUrl: PropTypes.string,
  homeUrl: PropTypes.string,
  blogUrl: PropTypes.string,
  codeUrl: PropTypes.string,
  nodesUrl: PropTypes.string,
  safeUrl: PropTypes.string,
  walletUrl: PropTypes.string,
  verifierUrl: PropTypes.string,
  explorerUrl: PropTypes.string
}
