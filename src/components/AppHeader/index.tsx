import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { space } from '../theme'
import { ButtonV2 } from '../Button/V2'
import { SmartLink } from '../Link/SmartLink'
import { AppIconHeaderFooter } from '../Icons'
import { LabeledText, LabeledTextProps } from '../LabeledText'
import { AddressLink, AddressLinkProps } from '../LabeledText/AddressLink'
import AppIconWrapper from './AppIconWrapper'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: ${space()} 0;
  margin: -${space()} 0;
  background-color: var(--white-broken);

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: ${space('large')};
  row-gap: ${space()};
`

const NavLeft = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: ${space('large')};
`

const NavRight = styled(NavLeft)`
  gap: ${space()};
`

const NavLinkSimple = styled(SmartLink)`
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

  &:hover,
  &.active {
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

export function AppHeader(props: AppHeaderProps) {
  const router = useRouter()
  const {
    logout,
    connection,
    appTitle,
    appIcon,
    appUrl,
    addressLinks,
    labeledTexts,
    appHeaderLinks
  } = props
  return (
    <Header>
      <NavLeft>
        {appIcon &&
          (appUrl ? (
            <NavLinkSimple href={appUrl}>
              <AppIconWrapper title={appTitle}>{appIcon}</AppIconWrapper>
            </NavLinkSimple>
          ) : (
            <AppIconWrapper title={appTitle}>{appIcon}</AppIconWrapper>
          ))}
        {addressLinks?.map((addressLink, index) => (
          <AddressLink key={index} {...addressLink} />
        ))}
        {labeledTexts?.map((labeledText, index) => (
          <LabeledText key={index} {...labeledText} />
        ))}
        {connection}
      </NavLeft>
      <NavRight>
        {appHeaderLinks &&
          appHeaderLinks.map((link, index) => (
            <NavLinkRound
              key={index}
              href={link.url}
              className={link.url === router?.pathname ? 'active' : ''}
            >
              {link.title}
            </NavLinkRound>
          ))}
        {logout && <NavButton onClick={logout}>Logout</NavButton>}
      </NavRight>
    </Header>
  )
}

export interface AppHeaderProps {
  logout?: () => void
  connection?: JSX.Element
  appTitle?: string
  appIcon?: JSX.Element
  appUrl?: string
  addressLinks?: Array<AddressLinkProps>
  labeledTexts?: Array<LabeledTextProps>
  appHeaderLinks?: Array<{
    title: string
    url: string
  }>
}

export const AppHeaderPropTypes = {
  logout: PropTypes.func,
  connection: PropTypes.node,
  appTitle: PropTypes.string,
  appIcon: PropTypes.node,
  appUrl: PropTypes.string,
  addressLinks: PropTypes.arrayOf(PropTypes.shape(AddressLink.propTypes)),
  labeledTexts: PropTypes.arrayOf(PropTypes.shape(LabeledText.propTypes)),
  appHeaderLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
}

AppHeader.propTypes = AppHeaderPropTypes
AppHeader.defaultProps = {
  appIcon: <AppIconHeaderFooter iconStyle='dark' />,
  appUrl: '/'
}
